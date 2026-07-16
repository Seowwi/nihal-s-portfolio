"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useEditable } from '@/contexts/EditableContext';
import { Pencil, RotateCcw } from 'lucide-react';

type EditableTextProps = {
  path: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  /** Set true when this element is inside a gradient-text/text-transparent parent */
  insideGradient?: boolean;
  children?: React.ReactNode;
};

export default function EditableText({
  path,
  defaultValue,
  as: Tag = 'span',
  className = '',
  multiline = false,
  insideGradient = false,
}: EditableTextProps) {
  const { isEditMode, getContent, setContent, resetSingleContent } = useEditable();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const currentValue = getContent(path, defaultValue);

  const isCustomized = currentValue !== defaultValue;

  const startEditing = useCallback(() => {
    if (!isEditMode) return;
    setEditValue(currentValue);
    setIsEditing(true);
  }, [isEditMode, currentValue]);

  const saveEdit = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== defaultValue) {
      setContent(path, trimmed);
    } else if (trimmed === defaultValue) {
      // If user reverts to default, remove the custom content
      resetSingleContent(path);
    }
    setIsEditing(false);
  }, [editValue, defaultValue, path, setContent, resetSingleContent]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelEdit();
    }
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      saveEdit();
    }
    // For multiline, Ctrl+Enter or Cmd+Enter saves
    if (e.key === 'Enter' && multiline && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveEdit();
    }
  }, [cancelEdit, saveEdit, multiline]);

  // Auto-focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Place cursor at end
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  // If not in edit mode, render normally
  if (!isEditMode) {
    return <Tag className={className}>{currentValue}</Tag>;
  }

  // In edit mode but not currently editing this element
  if (!isEditing) {
    return (
      <Tag
        className={`${className} editable-text-wrapper ${insideGradient ? 'editable-gradient' : ''}`}
        onClick={startEditing}
      >
        {currentValue}
        <span className="editable-icon">
          <Pencil size={12} />
        </span>
        {isCustomized && (
          <span
            className="editable-reset-icon"
            onClick={(e) => {
              e.stopPropagation();
              resetSingleContent(path);
            }}
            title="Reset về mặc định"
          >
            <RotateCcw size={12} />
          </span>
        )}
      </Tag>
    );
  }

  // Currently editing
  if (multiline) {
    return (
      <div className="editable-editing-container">
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          className="editable-textarea"
          rows={4}
        />
        <div className="editable-hint">
          Ctrl+Enter để lưu · Escape để hủy
        </div>
      </div>
    );
  }

  return (
    <span className="editable-editing-container">
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={saveEdit}
        onKeyDown={handleKeyDown}
        className="editable-input"
      />
    </span>
  );
}
