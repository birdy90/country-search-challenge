import { NextRequest } from 'next/server';

import {
  findClosestCountry,
  getCoords,
  getIpFromRequest,
  IpRequestErrors,
} from '@/lib/searchUtils';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const searchString = params.get('search') ?? '';

  // don't process request if string is empty
  if (searchString.length === 0) {
    return Response.json({ results: [] });
  }

  // prepare coordinates
  let coords;
  try {
    const ip = getIpFromRequest(request);
    coords = await getCoords(ip, params);
  } catch {
    return Response.json(
      { error: IpRequestErrors.IP_REQUEST_FAILED },
      { status: 404 },
    );
  }

  // if no coordinates defined
  if (!coords.lat || !coords.lng) {
    return Response.json(
      { error: IpRequestErrors.NO_COORDS_FOUND },
      { status: 404 },
    );
  }

  const filteredCountries = findClosestCountry(searchString, coords);

  return Response.json({ results: filteredCountries, coords });
}
