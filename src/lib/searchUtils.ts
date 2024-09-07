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
Converts coordinates
 */
export const polarToCartesian = (latAngle: number, lngAngle: number) => {
  const lat = (Math.PI * latAngle) / 180;
  const lng = (Math.PI * lngAngle) / 180;

  const x = Math.cos(lat) * Math.cos(lng);
  const y = Math.cos(lat) * Math.sin(lng);
  const z = Math.sin(lat);

  return [x, y, z];
};

/*
Cartesian vector length
 */
export const vectorLength = (x: number, y: number, z: number) => {
  return Math.sqrt(x * x + y * y + z * z);
};

/*
Returns angle between two polar points
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  const [x1, y1, z1] = polarToCartesian(lat1, lng1);
  const [x2, y2, z2] = polarToCartesian(lat2, lng2);
  const len1 = vectorLength(x1, y1, z1);
  const len2 = vectorLength(x2, y2, z2);

  const dotProduct = x1 * x2 + y1 * y2 + z1 * z2;
  const radiantAngle = Math.acos(dotProduct / (len1 * len2));
  return (180 * radiantAngle) / Math.PI;
};

/*
Attaches distance property to every country object for farther search
 */
export const appendDistancesToCountries = (
  list: CountryItem[],
  coords: Coordinates,
) => {
  return list.map<{ country: CountryItem; distance: number }>((country) => {
    const distance = calculateDistance(
      country.latlng[0],
      country.latlng[1],
      coords.lat,
      coords.lng,
    );

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
