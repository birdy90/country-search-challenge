import { render, screen } from '@testing-library/react';

import { ResultsList } from '@/components/ResultsList';

describe('results list', () => {
  test('show no results', () => {
    render(<ResultsList items={[]} />);
    expect(screen.getByRole('listitem')).toHaveTextContent('Nothing found');
  });

  test('show data', () => {
    const data = ['test 1', 'test 2', 'test 3'];
    render(<ResultsList items={data} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(data.length);
    data.forEach((item) => {
      expect(screen.getByRole('listitem', { name: item })).toBeInTheDocument();
    });
  });
});
