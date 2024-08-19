import {
  appendDistancesToCountries,
  searchData,
  stripDistanceFromCountries,
} from '@/lib/searchUtils';

import { countries } from '@/data/countries';

describe('search utils tests', () => {
  test('append distance', () => {
    const data = countries.slice(0, 1);
    const updatedData = appendDistancesToCountries(data, { lat: 0, lng: 0 });
    expect(updatedData[0]).toHaveProperty('distance');
  });

  test('strip distance', () => {
    const data = countries.slice(0, 1);
    const updatedData = appendDistancesToCountries(data, { lat: 0, lng: 0 });
    const restoredData = stripDistanceFromCountries(updatedData);
    expect(restoredData[0]).not.toHaveProperty('distance');
  });
});

describe('search method tests', () => {
  test('empty list with empty string', () => {
    const results = searchData('', { lat: 0, lng: 0 });
    expect(results).toHaveLength(0);
  });

  test('returns results', () => {
    const results = searchData('ge', { lat: 0, lng: 0 });
    expect(results).toHaveLength(2);
  });

  test('returns closest country', () => {
    const results = searchData('ge', { lat: 41.72, lng: 44.77 }); // Georgia coordinates
    expect(results[0].name).toBe('Georgia');
  });
});
