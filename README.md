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
- selected country with additional info

## Todo list

- [x] input component styling, make it clearable
- [x] results list styling
- [x] selected country styling
- [x] API: automatic location detection
- [x] API: handle coordinates from request parameters
- [x] API: endpoint to get and sort data by string
- [ ] combine input and results list
- [ ] coordinates selector styling, make it clearable
- [ ] pass selected coordinates to API

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
