import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';

import { Coordinates } from '@/types';

type GeolocationContextData = {
  error: string;
  coords?: Coordinates;
};

type GeolocationContext = GeolocationContextData &
  Partial<{
    setCoords: (coords: Coordinates) => void;
    setError: (err: string) => void;
  }>;

const defaultValues: GeolocationContextData = {
  error: '',
};

export enum GeolocationErrors {
  LOCATION_IS_TURNED_OFF = `Check whether geolocation is allowed, search won't work`,
}

const geolocationContext = createContext<GeolocationContext>(defaultValues);

export const GeolocationProvider = (props: PropsWithChildren) => {
  const [error, setError] = useState(defaultValues.error);
  const [coords, setCoords] = useState<Coordinates>();

  const ctx = useRef({
    coords,
    error,
    setCoords,
    setError,
  });

  return (
    <geolocationContext.Provider value={ctx.current}>
      {props.children}
    </geolocationContext.Provider>
  );
};

export const useGeolocation = () => {
  const ctx = useContext(geolocationContext);
  if (ctx === null) {
    throw new Error(
      `useGeolocation hook should be used within GeolocationProvider`,
    );
  }
  return ctx;
};
