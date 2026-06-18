# URL Shortener Frontend

React + TypeScript + Vite frontend for the URL Shortener app. The UI lets users create short links, view saved URLs, copy short URLs, delete entries, and see click counts returned by the backend.

- Backend: <a href="https://github.com/I-k-a-r-o-s/url-shortener-backend" target="_blank" >Visit</a>

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- daisyUI 5
- Axios
- React Hot Toast
- React Icons

## Project Structure

```text
src/
  api/
    axios.ts              Axios client configured from VITE_BASE_URL
  components/
    Header.tsx            Top navigation
    Home.tsx              Short URL creation form
    UrlTable.tsx          URL list, copy action, delete action
    Footer.tsx            Footer
  context/
    AppContext.tsx        Shared URL data, loading state, and fetch logic
  types/
    types.ts              Shared frontend TypeScript types
  App.tsx                 App layout composition
  main.tsx                React entry point
```

## Environment Variables

Create `frontend/.env` with:

```env
VITE_BASE_URL=(eg:-http://localhost:5000/api/)
```

`VITE_BASE_URL` should point to the backend API base path. The frontend uses it for API calls and for constructing short redirect links.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

On Windows PowerShell, if script execution policy blocks `npm`, use `npm.cmd` instead:

```bash
npm.cmd run dev
```

## Backend Dependency

The frontend expects the backend to expose these routes under `VITE_BASE_URL`:

- `POST /shorturl`
- `GET /shorturl`
- `GET /shorturl/:id`
- `DELETE /shorturl/:id`

## Notes

- The app state is provided through `AppContextProvider`.
- Toast notifications are handled by `react-hot-toast`.
- Long URLs are visually truncated in the table to keep the layout responsive.
- The table scrolls horizontally on small screens.
