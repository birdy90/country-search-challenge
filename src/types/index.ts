export type CountryItem = {
  alpha2Code: string;
  alpha3Code: string;
  altSpellings?: string[];
  area?: number;
  /* Array of alpha3Code */
  borders?: string[];
  callingCodes?: string[];
  capital?: string;
  cioc?: string;
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  demonym?: string;
  flag: string;
  flags: {
    svg: string;
    png: string;
  };
  gini?: number;
  independent?: boolean;
  languages?: {
    iso639_1?: string;
    iso639_2?: string;
    name: string;
    nativeName?: string;
  }[];
  latlng: [number, number];
  name: string;
  nativeName: string;
  numericCode?: string;
  population: number;
  region: string;
  regionalBlocs?: {
    acronym: string;
    name: string;
    otherAcronyms?: string[];
    otherNames?: string[];
  }[];
  subregion: string;
  timezones: string[];
  topLevelDomain?: string[];
  translations: Record<string, string>;
};
