import { render, screen } from '@testing-library/react';

import { countries } from '@/data/countries';

import { SearchResults } from '@/components/searchResults';

describe('results list', () => {
  test('show no results', () => {
    render(<SearchResults items={[]} />);
    expect(screen.getByRole('listitem')).toHaveTextContent('Nothing found');
  });

  test('show data', () => {
    const data = countries.slice(0, 3);
    render(<SearchResults items={data} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(data.length);
    data.forEach((item) => {
      expect(
        screen.getByRole('listitem', { name: item.name }),
      ).toBeInTheDocument();
    });
  });
});
