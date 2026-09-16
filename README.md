# United States Congress Legislators Viewer

The [unitedstates/congress-legislators](https://github.com/unitedstates/congress-legislators) respository is a database mantained through a combination of automated imports and manual edits. Their large, text-based records can be intimidating for regular people to browse. This project makes exploring that information easier with a user-friendly interface. It's a webapp for anyone interested in exploring or helping maintain open source congressional data.

## Screenshots

| Main View | Dark Mode | Column Selector | Filter Selector | Details Page |
|-|-|-|-|-|
|![Alt text](/public/screenshots/1.jpg "Main View")|![Alt text](/public/screenshots/2.jpg "Dark Mode")|![Alt text](/public/screenshots/4.jpg "Column Selector")|![Alt text](/public/screenshots/3.jpg "Filter Selector")|![Alt text](/public/screenshots/5.jpg "Details Page")

## Demo

[glowmachine.github.io/uscl-viewer](https://glowmachine.github.io/uscl-viewer/)

## Features / To Do List

- [x] responsive layout
- [x] load data
- [x] search field
- [x] filters menu
- [x] profile pages
- [x] portrait images
- [x] state flags
- [x] dark/light mode

## Tech Stack

| Area             | Technologies                    |
|------------------|---------------------------------|
| Frontend         | React, TypeScript, Tailwind CSS |
| Build & Testing  | Vite, Vitest                    |
| Data Persistence | LocalStorage                    |
| Data Source      | @unitedstates (github)          |
| Icons            | Google Fonts, Font Awesome      |
| Deployment       | Netlify                         |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/glowmachine/uscl-viewer.git
cd uscl-viewer

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open in browser
http://localhost:5173
````

## Attribution

- congressional data from https://github.com/unitedstates/congress-legislators
- legislator photos from https://github.com/unitedstates/images
- state flags from https://github.com/nibsbin/us-state-flags-svg