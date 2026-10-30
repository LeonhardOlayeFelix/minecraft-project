# Minecraft Item Encyclopedia

A web app for searching and browsing every Minecraft item and block, with crafting recipes, categories and fuzzy search.

Built with **React**, **TypeScript** and **Vite**.

![Dark Mode](https://github.com/user-attachments/assets/ee053c1d-0faf-40f8-a591-b62f057801c0)

## Features

- **Fuzzy search** – finds items even with typos, and suggests similar items when there's no exact match
- **Category filters** – Weapons & Tools, Blocks, Potions, Consumables, Plants, Valuables, Musical, Recipes and Ingredients
- **Crafting recipes** – shows each recipe on a 3×3 crafting grid, plus which recipes an item is used in
- **Bookmarks** – pin items to keep them handy; saved in the browser between visits
- **Light and dark mode**
- **Responsive layout** – works on desktop, tablet and mobile
- **Pagination and skeleton loading** – keeps large result sets fast and readable

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 18, TypeScript, Vite |
| UI | Chakra UI, Emotion |
| Data fetching and caching | TanStack React Query, Axios |
| Search | Fuse.js |
| Linting | ESLint |

## How It Works

Item data comes from two public sources:

- [minecraft-api](https://minecraft-api.vercel.app) – item and block names, images, descriptions and crafting recipes
- [PrismarineJS minecraft-data](https://github.com/PrismarineJS/minecraft-data) – game data for version 1.20, such as block properties and food values

The app fetches both, caches them with React Query, and merges them by item name so each item has the fields from both sources. Items are then sorted into categories and fed to the search and filter UI.

## Getting Started

You'll need [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/LeonhardOlayeFelix/minecraft-project.git
cd minecraft-project
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Type-checks and builds a production bundle into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Project Structure

```
src/
├── services/      # API clients for the two data sources
├── hooks/         # useMinecraftHook – fetches, merges and categorises the data
├── interfaces/    # TypeScript types for items, blocks, foods and recipes
├── components/
│   ├── home_page_components/   # Nav bar, search input, colour-mode switch
│   └── MinecraftComponents/    # Item cards, filters, pagination, crafting grids
└── App.tsx        # Page layout and app state
```

## Screenshots

**Light mode**

![Light Mode](https://github.com/user-attachments/assets/23d983db-205d-4a05-8f19-923d27bbe0a7)

**Recipes and ingredients**

![Recipes and Ingredients](https://github.com/user-attachments/assets/2e15cdf4-74bd-403d-aa8d-9a72b5c07c23)

**Responsive layout**

![Responsiveness](https://github.com/user-attachments/assets/3eea1215-a681-4537-b55f-9bead837c29a)

**Demo video**

https://github.com/user-attachments/assets/9a9867cd-29de-4be7-9111-ce58fc9e1d64

## Disclaimer

This is an unofficial fan project, not affiliated with or endorsed by Mojang or Microsoft. Minecraft is a trademark of Mojang Synergies AB.
