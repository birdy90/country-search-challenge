# Closest country search challenge

## Requirements

- build search input
  - clearable
  - makes requests to API
  - shows results list
- build API endpoint
  - gets current position by IP
  - let user pass lat/lng through query parameters instead of automatic detection
  - filters results from data source (provided JSON file)
  - sorts countries by ascending distance
- show selected country with additional info

## Todo list

- [x] input component styling, make it clearable
- [x] results list styling
- [x] selected country styling
- [x] API: automatic location detection
- [x] API: handle coordinates from request parameters
- [x] API: endpoint to get and sort data by string
- [x] combine input and results list
- [x] select a country
- [x] latest used coordinates indicator
- [x] [post-challenge] fix distance calculations (calculate angle between two points/vectors)

## Additional considerations

- I don't log errors to logging systems here
- I have not implemented full keyboard navigation for search results list. I could have used Downshift to handle that
- it is better to cache responses from IP API for different IP addresses to avoid additional requests
- if for some reason IP API doesn't return coordinates (on localhost, for example), then I make another call using Geolocation API to set coordinates for request
- result list won't overflow the screen, but it is always below the search input and I didn't solve the situation when input is close to bottom side of the window
- probably, it's good to use fuzzy search (like Levenstein's distance) here, so people could make typos and still get results

## Run information

Built with [Next.js + Tailwind CSS + TypeScript Starter and Boilerplate](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter)

### 1. Install dependencies

```bash
npm i
```

### 2. Run the development server

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000)
