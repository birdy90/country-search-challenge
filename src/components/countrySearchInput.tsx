'use client';

import {
  AllHTMLAttributes,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { performSearch } from '@/lib/searchUtils';
import { useDebouncedValue } from '@/lib/useDebouncedValue';

import { Input } from '@/components/input';
import { SearchResults } from '@/components/searchResults';

import { CountryItem } from '@/types';

export const CountrySearchInput = (
  props: Omit<
    AllHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'onInput'
  >,
) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<CountryItem[]>([]);
  const [resultsHeight, setResultsHeight] = useState(0);
  const throttledSearchValue = useDebouncedValue(searchValue, 500);
  const isListVisible = searchValue.length > 0;

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (throttledSearchValue === '') return;
    performSearch(throttledSearchValue).then((data) => {
      setSearchResults(data);
    });
  }, [throttledSearchValue]);

  useEffect(() => {
    if (searchValue === '') {
      setSearchResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isListVisible || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    const allowedHeight = window.innerHeight - rect.top - 16;
    setResultsHeight(allowedHeight);
  }, [isListVisible, searchResults, listRef]);

  return (
    <div className='relative'>
      <Input
        value={searchValue}
        onInput={inputHandler}
        onClear={() => setSearchValue('')}
        {...props}
      />
      {isListVisible && (
        <SearchResults
          ref={listRef}
          className='absolute z-10 top-[calc(100%+0.5rem)]'
          style={{ maxHeight: `${resultsHeight}px` }}
          items={searchResults}
        />
      )}
    </div>
  );
};
