import React from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';

interface TermProps {
  id: string;
  children?: React.ReactNode;
  onOpenGlossary: (termId: string) => void;
  className?: string;
}

export const Term: React.FC<TermProps> = ({ 
  id, 
  children, 
  onOpenGlossary, 
  className = '' 
}) => {
  const entry = GLOSSARY_TERMS[id];
  const label = children || (entry ? entry.acronym || entry.term : id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenGlossary(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onOpenGlossary(id);
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={entry ? `${entry.term} — Click to view glossary definition` : 'View definition'}
      className={`cursor-pointer inline-flex items-baseline font-medium text-stone-900 dark:text-stone-100 underline decoration-stone-300 dark:decoration-stone-600 decoration-1 underline-offset-3 hover:decoration-stone-900 dark:hover:decoration-stone-100 hover:text-stone-950 dark:hover:text-white transition-all select-text focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 rounded-xs ${className}`}
    >
      {label}
    </span>
  );
};
