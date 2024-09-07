import {
  appendDistancesToCountries,
  calculateDistance,
  findClosestCountry,
  polarToCartesian,
} from '@/lib/searchUtils';

import { countries } from '@/data/countries';

describe('search utils tests', () => {
  test('append distance', () => {
    const data = countries.slice(0, 1);
    const updatedData = appendDistancesToCountries(data, { lat: 0, lng: 0 });
    expect(updatedData[0]).toHaveProperty('distance');
  });
});

describe('search method tests', () => {
  test('empty list with empty string', () => {
    const results = findClosestCountry('', { lat: 0, lng: 0 });
    expect(results).toHaveLength(0);
  });

  test('returns results', () => {
    const results = findClosestCountry('ge', { lat: 0, lng: 0 });
    expect(results).toHaveLength(2);
  });

  test('returns closest country', () => {
    const results = findClosestCountry('ge', { lat: 41.72, lng: 44.77 }); // Georgia coordinates
    expect(results[0].name).toBe('Georgia');
  });
});

describe('distance calculations', () => {
  test.each([
    [0, 0, 0, 0, 0],
    [0, 0, 33, 0, 33],
    [0, 0, 0, 112, 112],
    [90, 0, -90, 0, 180],
    [0, 180, 0, -180, 0],
    [80, -90, 80, 90, 20],
  ])(
    'distance between [%i, %i] and [%i, %i] should be %i',
    (lat1, lng1, lat2, lng2, distance) => {
      const calculatedDistance = calculateDistance(lat1, lng1, lat2, lng2);
      expect(Math.round(calculatedDistance)).toBe(distance);
    },
  );
});

describe('polar to cartesian', () => {
  test.each([
    [0, 0, 1, 0, 0],
    [90, 0, 0, 0, 1],
    [-90, 0, 0, 0, -1],
    [0, 180, -1, 0, 0],
  ])('converts [%i, %i] to [%i, %i, %i]', (lat, lng, x, y, z) => {
    const point = polarToCartesian(lat, lng);
    expect(point[0] - x).toBeLessThan(0.001);
    expect(point[1] - y).toBeLessThan(0.001);
    expect(point[2] - z).toBeLessThan(0.001);
  });
});
