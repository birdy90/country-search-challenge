type ResultsListProps = {
  items: string[];
};

export const ResultsList = (props: ResultsListProps) => {
  const emptyList = props.items.length === 0;

  return (
    <ul
      className='py-2 border border-gray-400 rounded-lg shadow-lg focus-visible:outline-primary-500'
      tabIndex={0}
    >
      {emptyList && (
        <li className='text-gray-400 py-2 text-center'>Nothing found</li>
      )}
      {props.items.map((country) => (
        <li
          className='px-6 py-2 hover:bg-gray-100 cursor-pointer'
          key={country}
          aria-label={country}
        >
          {country}
        </li>
      ))}
    </ul>
  );
};
