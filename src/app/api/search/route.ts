import { NextRequest } from 'next/server';

import {
  getCoords,
  getIpFromRequest,
  IpRequestErrors,
  searchData,
} from '@/lib/searchUtils';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const searchString = params.get('search') ?? '';

  // don't process request if string is empty
  if (searchString.length === 0) {
    return Response.json({ results: [] });
  }

  const ip = getIpFromRequest(request);
  const coords = await getCoords(ip, params);

  // if no coordinates defined
  if (!coords.lat || !coords.lng) {
    return Response.json({ error: IpRequestErrors.NOT_FOUND }, { status: 404 });
  }

  const filteredCountries = searchData(searchString, coords);

  return Response.json(filteredCountries);
}
