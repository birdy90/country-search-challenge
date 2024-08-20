'use client';

import {
  AllHTMLAttributes,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { GeolocationErrors, useGeolocation } from '@/lib/geolocationContext';
import {
  getClientsPosition,
  IpRequestErrors,
  performSearch,
} from '@/lib/searchUtils';
import { useDebouncedValue } from '@/lib/useDebouncedValue';

import { Input } from '@/components/input';
import { SearchResults } from '@/components/searchResults';

import { CountryItem } from '@/types';

type CountrySearchInputProps = Omit<
  AllHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'onChange' | 'onInput'
> & {
  onSelected?: (country: CountryItem) => void;
};

export const CountrySearchInput = (props: CountrySearchInputProps) => {
  const { onSelected, ...inputProps } = props;

  const listRef = useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<CountryItem[]>([]);
  const [resultsHeight, setResultsHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const geolocation = useGeolocation();

  const throttledSearchValue = useDebouncedValue(searchValue, 500);
  const isListVisible = searchValue.length > 0;

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchValue(e.target.value);
  };

  const onClear = () => {
    setSearchValue('');
  };

  const onCountrySelect = (country: CountryItem) => {
    onClear();
    onSelected?.(country);
  };

  const search = useCallback(async () => {
    try {
      const data = await performSearch(throttledSearchValue).catch(async () => {
        // retry with local coordinates
        const localCoords =
          geolocation.coords ??
          (await getClientsPosition().catch((e) => {
            geolocation.setError?.(GeolocationErrors.LOCATION_IS_TURNED_OFF);
            throw new Error(e);
          }));
        geolocation.setError?.('');
        return performSearch(throttledSearchValue, localCoords);
      });

      // save latest coordinates
      if (data.coords) {
        geolocation.setCoords?.(data.coords);
      }

      setSearchResults(data.results ?? []);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as Error;

      if (error.message === IpRequestErrors.NO_COORDS_FOUND) {
        geolocation.setError?.(GeolocationErrors.LOCATION_IS_TURNED_OFF);
        return;
      }

      // we use console.error here instead of sending a message to a logging system ony for current challenge
      // eslint-disable-next-line no-console
      console.error(
        `Unexpected error while performing search: ${error.message}`,
      );
    } finally {
      setLoading(false);
    }
  }, [geolocation, throttledSearchValue]);

  useEffect(() => {
    if (throttledSearchValue === '') return;
    search();
  }, [search, throttledSearchValue]);

  // clear results immediately if search string is empty
  useEffect(() => {
    if (searchValue === '') {
      setSearchResults([]);
    }
  }, [searchValue]);

  // recalculate search results list size
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
        onClear={onClear}
        {...inputProps}
      />

      {isListVisible && (
        <SearchResults
          ref={listRef}
          className='absolute z-10 top-[calc(100%+0.5rem)]'
          style={{ maxHeight: `${resultsHeight}px` }}
          items={searchResults}
          onSelected={onCountrySelect}
          loading={loading}
        />
      )}
    </div>
  );
};
