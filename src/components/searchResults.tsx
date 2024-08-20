import { AllHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/cn';

import { CountryItem } from '@/types';

type ResultsListProps = AllHTMLAttributes<HTMLUListElement> & {
  items: CountryItem[];
  onSelected?: (country: CountryItem) => void;
  loading?: boolean;
};

export const SearchResults = forwardRef<HTMLUListElement, ResultsListProps>(
  (props: ResultsListProps, listRef) => {
    const { onSelected, items, className, loading, ...listProps } = props;
    const emptyList = items.length === 0;

    return (
      <ul
        ref={listRef}
        tabIndex={0}
        {...listProps}
        className={cn(
          'py-2 border border-gray-400 bg-white w-full rounded-lg shadow-lg focus-visible:outline-primary-500',
          'overflow-y-auto',
          className,
        )}
      >
        {loading ? (
          <li className='text-gray-400 py-2 text-center'>Loading...</li>
        ) : (
          <>
            {emptyList && (
              <li className='text-gray-400 py-2 text-center'>Nothing found</li>
            )}

            {items.map((country) => (
              <li
                className='px-6 py-2 hover:bg-gray-100 cursor-pointer'
                key={country.name}
                aria-label={country.name}
                onClick={() => onSelected?.(country)}
              >
                {country.name}
              </li>
            ))}
          </>
        )}
      </ul>
    );
  },
);
