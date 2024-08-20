'use client';

import { AllHTMLAttributes, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { MdClose } from 'react-icons/md';

import { cn } from '@/lib/cn';

type InputProps = AllHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
};

export const Input = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { className, value, onInput, onChange, onClear, ...inputProps } = props;

  function onInputHandler(e: ChangeEvent<HTMLInputElement>) {
    onInput?.(e);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
  }

  function onInputClear() {
    if (!inputRef.current) return;
    inputRef.current.focus();
    onClear?.();
  }

  function onEscapeDown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      onInputClear();
    }
  }

  function onClearKeyDown(e: KeyboardEvent) {
    if (e.code !== 'Tab') {
      e.preventDefault();
    }

    if (e.code === 'Enter' || e.code === 'Space') {
      onInputClear();
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
        value={value}
        onInput={onInputHandler}
        onChange={onChangeHandler}
        {...inputProps}
      />

      {!!value && (
        <MdClose
          className='size-8 p-1 text-gray-400 hover:text-gray-600 cursor-pointer'
          onClick={onInputClear}
          onKeyDown={onClearKeyDown}
          tabIndex={0}
        />
      )}
    </div>
  );
};
