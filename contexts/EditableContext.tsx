"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

type HiddenItemsMap = Record<string, Record<string, string[]>>;

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
};

const STORAGE_KEY = 'portfolio_custom_content';
const HIDDEN_STORAGE_KEY = 'portfolio_hidden_items';

const EditableContext = createContext<EditableContextType | undefined>(undefined);

export const EditableProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customContent, setCustomContent] = useState<Record<string, Record<string, string>>>({});
  const [hiddenItems, setHiddenItems] = useState<HiddenItemsMap>({});
  const { language } = useLanguage();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustomContent(JSON.parse(saved));
      }
      const savedHidden = localStorage.getItem(HIDDEN_STORAGE_KEY);
      if (savedHidden) {
        setHiddenItems(JSON.parse(savedHidden));
      }
    } catch (e) {
      console.error('Failed to load custom content:', e);
    }
  }, []);

  // Save to localStorage when content changes
  const saveToStorage = useCallback((content: Record<string, Record<string, string>>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save custom content:', e);
    }
  }, []);

  const saveHiddenToStorage = useCallback((hidden: HiddenItemsMap) => {
    try {
      localStorage.setItem(HIDDEN_STORAGE_KEY, JSON.stringify(hidden));
    } catch (e) {
      console.error('Failed to save hidden items:', e);
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
