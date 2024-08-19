import React, { ReactElement } from 'react';

type CountryDescriptionPointProps = {
  icon: ReactElement;
  title: string;
  value: string | number;
};

export const CountryDescriptionPoint = (
  props: CountryDescriptionPointProps,
) => {
  return (
    <div className='flex gap-2 items-center' title={props.title}>
      <div aria-hidden>{props.icon}</div>
      <div aria-label={props.title}>{props.value}</div>
    </div>
  );
};
