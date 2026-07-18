"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

type HiddenItemsMap = Record<string, Record<string, string[]>>;

type LayoutMap = Record<string, {
  order: number[];
  spans: Record<number, number>;
}>;

type EditableContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  getContent: (path: string, defaultValue: string) => string;
  setContent: (path: string, value: string) => void;
  resetContent: () => void;
  resetSingleContent: (path: string) => void;
  // Hidden items management
  isItemHidden: (section: string, index: number) => boolean;
  hideItem: (section: string, index: number) => void;
  showItem: (section: string, index: number) => void;
  getHiddenItems: (section: string) => number[];
  getHiddenCount: (section: string) => number;
  // Layout management
  getLayout: (section: string, defaultLength: number) => { order: number[], spans: Record<number, number> };
  updateOrder: (section: string, newOrder: number[]) => void;
  updateSpan: (section: string, index: number, span: number) => void;
  // Added items management
  getAddedCount: (section: string) => number;
  addNewItem: (section: string) => void;
};

const STORAGE_KEY = 'portfolio_custom_content';
const HIDDEN_STORAGE_KEY = 'portfolio_hidden_items';

const EditableContext = createContext<EditableContextType | undefined>(undefined);

export const EditableProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customContent, setCustomContent] = useState<Record<string, Record<string, string>>>({});
  const [hiddenItems, setHiddenItems] = useState<HiddenItemsMap>({});
  const [layoutConfig, setLayoutConfig] = useState<LayoutMap>({});
  const [addedItemsCount, setAddedItemsCount] = useState<Record<string, number>>({});
  const { language } = useLanguage();

  // Load from DB on mount
  useEffect(() => {
    const fetchFromDb = async () => {
      try {
        const response = await fetch('/api/store');
        if (response.ok) {
          const data = await response.json();
          if (data.customContent && Object.keys(data.customContent).length > 0) {
            setCustomContent(data.customContent);
          }
          if (data.hiddenItems && Object.keys(data.hiddenItems).length > 0) {
            setHiddenItems(data.hiddenItems);
          }
          if (data.layoutConfig && Object.keys(data.layoutConfig).length > 0) {
            setLayoutConfig(data.layoutConfig);
          }
          if (data.addedItemsCount && Object.keys(data.addedItemsCount).length > 0) {
            setAddedItemsCount(data.addedItemsCount);
          }
        }
      } catch (e) {
        console.error('Failed to load custom content from DB:', e);
      }
    };
    
    fetchFromDb();
  }, []);

  // Save to DB when content changes
  const saveToStorage = useCallback(async (content: Record<string, Record<string, string>>) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customContent: content }),
      });
    } catch (e) {
      console.error('Failed to save custom content to DB:', e);
    }
  }, []);

  const saveHiddenToStorage = useCallback(async (hidden: HiddenItemsMap) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hiddenItems: hidden }),
      });
    } catch (e) {
      console.error('Failed to save hidden items to DB:', e);
    }
  }, []);

  const saveLayoutToStorage = useCallback(async (layout: LayoutMap) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layoutConfig: layout }),
      });
    } catch (e) {
      console.error('Failed to save layout config to DB:', e);
    }
  }, []);

  const saveAddedCountToStorage = useCallback(async (counts: Record<string, number>) => {
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addedItemsCount: counts }),
      });
    } catch (e) {
      console.error('Failed to save added items count to DB:', e);
    }
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const getContent = useCallback((path: string, defaultValue: string): string => {
    const langContent = customContent[language];
    if (langContent && path in langContent) {
      return langContent[path];
    }
    return defaultValue;
  }, [customContent, language]);

  const setContent = useCallback((path: string, value: string) => {
    setCustomContent(prev => {
      const updated = {
        ...prev,
        [language]: {
          ...(prev[language] || {}),
          [path]: value,
        },
      };
      saveToStorage(updated);
      return updated;
    });
  }, [language, saveToStorage]);

  const resetContent = useCallback(() => {
    setCustomContent(prev => {
      const updated = { ...prev };
      delete updated[language];
      saveToStorage(updated);
      return updated;
    });
    // Also reset hidden items for current language
    setHiddenItems(prev => {
      const updated = { ...prev };
      delete updated[language];
      saveHiddenToStorage(updated);
      return updated;
    });
  }, [language, saveToStorage, saveHiddenToStorage]);

  const resetSingleContent = useCallback((path: string) => {
    setCustomContent(prev => {
      const langContent = { ...(prev[language] || {}) };
      delete langContent[path];
      const updated = { ...prev, [language]: langContent };
      saveToStorage(updated);
      return updated;
    });
  }, [language, saveToStorage]);

  // Hidden items functions
  const isItemHidden = useCallback((section: string, index: number): boolean => {
    const langHidden = hiddenItems[language];
    if (!langHidden || !langHidden[section]) return false;
    return langHidden[section].includes(index.toString());
  }, [hiddenItems, language]);

  const hideItem = useCallback((section: string, index: number) => {
    setHiddenItems(prev => {
      const langHidden = prev[language] || {};
      const sectionHidden = langHidden[section] || [];
      const indexStr = index.toString();
      if (sectionHidden.includes(indexStr)) return prev;
      const updated = {
        ...prev,
        [language]: {
          ...langHidden,
          [section]: [...sectionHidden, indexStr],
        },
      };
      saveHiddenToStorage(updated);
      return updated;
    });
  }, [language, saveHiddenToStorage]);

  const showItem = useCallback((section: string, index: number) => {
    setHiddenItems(prev => {
      const langHidden = prev[language] || {};
      const sectionHidden = langHidden[section] || [];
      const indexStr = index.toString();
      const updated = {
        ...prev,
        [language]: {
          ...langHidden,
          [section]: sectionHidden.filter(i => i !== indexStr),
        },
      };
      saveHiddenToStorage(updated);
      return updated;
    });
  }, [language, saveHiddenToStorage]);

  const getHiddenItems = useCallback((section: string): number[] => {
    const langHidden = hiddenItems[language];
    if (!langHidden || !langHidden[section]) return [];
    return langHidden[section].map(i => parseInt(i));
  }, [hiddenItems, language]);

  const getHiddenCount = useCallback((section: string): number => {
    return getHiddenItems(section).length;
  }, [getHiddenItems]);

  // Layout functions
  const getLayout = useCallback((section: string, defaultLength: number) => {
    const defaultOrder = Array.from({ length: defaultLength }, (_, i) => i);
    const layout = layoutConfig[section] || { order: defaultOrder, spans: {} };
    // Ensure all items are in order array in case data length changed
    const missing = defaultOrder.filter(i => !layout.order.includes(i));
    return {
      order: [...layout.order, ...missing].filter(i => i < defaultLength),
      spans: layout.spans
    };
  }, [layoutConfig]);

  const updateOrder = useCallback((section: string, newOrder: number[]) => {
    setLayoutConfig(prev => {
      const sectionLayout = prev[section] || { order: [], spans: {} };
      const updated = {
        ...prev,
        [section]: { ...sectionLayout, order: newOrder }
      };
      saveLayoutToStorage(updated);
      return updated;
    });
  }, [saveLayoutToStorage]);

  const updateSpan = useCallback((section: string, index: number, span: number) => {
    setLayoutConfig(prev => {
      const sectionLayout = prev[section] || { order: [], spans: {} };
      const updated = {
        ...prev,
        [section]: {
          ...sectionLayout,
          spans: { ...sectionLayout.spans, [index]: span }
        }
      };
      saveLayoutToStorage(updated);
      return updated;
    });
  }, [saveLayoutToStorage]);

  // Added items functions
  const getAddedCount = useCallback((section: string): number => {
    return addedItemsCount[section] || 0;
  }, [addedItemsCount]);

  const addNewItem = useCallback((section: string) => {
    setAddedItemsCount(prev => {
      const updated = {
        ...prev,
        [section]: (prev[section] || 0) + 1
      };
      saveAddedCountToStorage(updated);
      return updated;
    });
  }, [saveAddedCountToStorage]);

  return (
    <EditableContext.Provider value={{
      isEditMode,
      toggleEditMode,
      getContent,
      setContent,
      resetContent,
      resetSingleContent,
      isItemHidden,
      hideItem,
      showItem,
      getHiddenItems,
      getHiddenCount,
      getLayout,
      updateOrder,
      updateSpan,
      getAddedCount,
      addNewItem,
    }}>
      {children}
    </EditableContext.Provider>
  );
};

export const useEditable = () => {
  const context = useContext(EditableContext);
  if (context === undefined) {
    throw new Error('useEditable must be used within an EditableProvider');
  }
  return context;
};
