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
- [ ] coordinates selector styling, make it clearable
- [ ] pass selected coordinates to API

## Additional considerations

- I don't log errors to logging systems here
- I did not implement full keyboard navigation for search results list. I could have used Downshift to handle that
- it is better to cache responses from IP API for different IP addresses to avoid additional requests
- result list won't overflow the screen, but it is always below the search input and I didn't solve the situation when input is close to bottom side of the window

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
