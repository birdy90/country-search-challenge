import Image from 'next/image';
import { MdLocationCity, MdPeople } from 'react-icons/md';

import { CountryDescriptionPoint } from '@/components/countryDescription/countryDescriptionPoint';

import { CountryItem } from '@/types';

type CountryDescriptionProps = {
  country: CountryItem;
};

function formattedPopulation(population: number) {
  if (population < 1000) return population.toString();
  const suffix = population > 1000000 ? 'M' : 'K';
  const shortenedNumber = population / (population > 1000000 ? 1000000 : 1000);
  const populationString = shortenedNumber.toFixed(2).replace('.00', '');
  return `${populationString} ${suffix}`;
}

export const CountryDescription = (props: CountryDescriptionProps) => {
  const populationFormatted = formattedPopulation(props.country.population);

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-start gap-6'>
        <Image
          src={props.country.flags.svg}
          alt='flag'
          width={120}
          height={90}
          className='rounded-lg border border-gray-400'
        />
        <div>
          <h2>
            {props.country.name}
            {props.country.nativeName !== props.country.name && (
              <> / {props.country.nativeName}</>
            )}
          </h2>

          <small className='text-gray-500'>
            {props.country.region} / {props.country.subregion} /{' '}
            {props.country.name}
          </small>

          {props.country.capital && (
            <CountryDescriptionPoint
              icon={<MdLocationCity />}
              title='Capital'
              value={props.country.capital}
            />
          )}
          <CountryDescriptionPoint
            icon={<MdPeople />}
            title='Population'
            value={populationFormatted}
          />
        </div>
      </div>
    </div>
  );
};
