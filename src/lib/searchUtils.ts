import { countries } from '@/data/countries';

import { Coordinates, CountryItem, SearchResponse } from '@/types';

export enum IpRequestErrors {
  NO_COORDS_FOUND = 'no-coords-found',
  IP_REQUEST_FAILED = 'ip-request-failed',
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

/*
Attaches distance property to every country object for farther search
 */
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

/*
Returns list of closest countries according to search string
 */
export const findClosestCountry = (
  searchString: string,
  coords: Coordinates,
) => {
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

  return countriesWithDistance.map<CountryItem>((item) => item.country);
};

/*
Gets client-side coordinates
 */
export const getClientsPosition = async () => {
  return await new Promise<Coordinates>((res, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        res({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (e) => {
        reject(e);
      },
    );
  });
};

/*
Performs search on the client-side
 */
export const performSearch = async (
  searchValue: string,
  coords?: Coordinates,
): Promise<SearchResponse> => {
  const params = new URLSearchParams();
  params.append('search', searchValue);
  if (coords) {
    params.append('lat', coords.lat.toString());
    params.append('lng', coords.lng.toString());
  }

  const response = await fetch(
    `/api/search?${params.toString()}`,
  ).then<SearchResponse>(async (data) => data.json());

  if (response.error !== undefined) {
    throw new Error(response.error);
  } else {
    return response;
  }
};
