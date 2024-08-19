import { countries } from '@/data/countries';

import { Coordinates, CountryItem } from '@/types';

export enum IpRequestErrors {
  NOT_FOUND,
}

/*
Gets IP from request headers
 */
export const getIpFromRequest = (request: Request) => {
  const headerString = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  return headerString.split(',')[0];
};

/*
Requests data from IP API and returns coordinates
 */
export const getLocationForIp = async (ip: string): Promise<Coordinates> => {
  const locationApiUrl = `http://ip-api.com/json/${ip}?fields=lat,lon`;
  const location = await fetch(locationApiUrl).then<{
    lat: number;
    lon: number;
  }>((data) => data.json());
  return { lat: location.lat, lng: location.lon };
};

/*
Handles coordinate obtainment
 */
export const getCoords = async (ip: string, params: URLSearchParams) => {
  const coords: Coordinates = {
    lat: parseFloat(params.get('lat') ?? ''),
    lng: parseFloat(params.get('lng') ?? ''),
  };

  // if not manual coordinates
  if (!coords.lat || !coords.lng) {
    const location = await getLocationForIp(ip);
    coords.lat = location.lat;
    coords.lng = location.lng;
  }

  return coords;
};

export const appendDistancesToCountries = (
  list: CountryItem[],
  coords: Coordinates,
) => {
  return list.map<{ country: CountryItem; distance: number }>((country) => {
    const diffLat = country.latlng[0] - coords.lat;
    const diffLng = country.latlng[1] - coords.lng;
    const distance = Math.sqrt(diffLat * diffLat + diffLng * diffLng);

    return {
      country,
      distance,
    };
  });
};

export const stripDistanceFromCountries = (
  list: { country: CountryItem; distance: number }[],
) => {
  return list.map<CountryItem>((item) => item.country);
};

export const searchData = (searchString: string, coords: Coordinates) => {
  if (searchString.length === 0) return [];

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(searchString.toLowerCase()),
  );

  const countriesWithDistance = appendDistancesToCountries(
    filteredCountries,
    coords,
  );

  // now lets sort countries by distance
  countriesWithDistance.sort((a, b) => a.distance - b.distance);

  return stripDistanceFromCountries(countriesWithDistance);
};
