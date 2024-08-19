'use client';

import {
  AllHTMLAttributes,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useState,
} from 'react';
import { MdClose } from 'react-icons/md';

import { cn } from '@/lib/utils';

export const Input = (props: AllHTMLAttributes<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { className, value, onInput, ...inputProps } = props;
  const [searchString, setSearchString] = useState(value);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchString(e.target?.value);
    onInput?.(e);
  }

  function onClear() {
    if (!inputRef.current) return;
    setSearchString('');
    inputRef.current.focus();
  }

  function onEscapeDown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      onClear();
    }
  }

  function onClearKeyDown(e: KeyboardEvent) {
    if (e.code !== 'Tab') {
      e.preventDefault();
    }

    if (e.code === 'Enter' || e.code === 'Space') {
      onClear();
    }
  }

  const wrapperClasses = cn(
    'flex items-center rounded-lg overflow-hidden',
    'border border-gray-400 hover:border-gray-600',
    'has-[:focus-visible]:outline has-[:focus-visible]:outline-primary-500',
    className,
  );

  return (
    <div className={wrapperClasses} onKeyDown={onEscapeDown}>
      <input
        ref={inputRef}
        className='border-none focus-visible:ring-0 grow'
        value={searchString}
        onInput={onInputChange}
        {...inputProps}
      />
      {!!searchString && (
        <MdClose
          className='size-8 p-1 text-gray-400 hover:text-gray-600 cursor-pointer'
          onClick={onClear}
          onKeyDown={onClearKeyDown}
          tabIndex={0}
        />
      )}
    </div>
  );
};
