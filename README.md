
# Restaurant Web Frontend

Frontend MVP for Restaurant application, connected to Node.js backend.

## Main Features
- Explore food & drink menu
- Filter, sort, and search menu
- Cart with Optimistic UI
- Simple checkout (name, phone, address form)
- Order history
- State management: Redux Toolkit (UI state), React Query (server state)
- Responsive & accessible
- Design system: Nunito, colors, radius, spacing based on Figma

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- React Query
- Axios
- Day.js

## Folder Structure
```
src/
  ├─ app/
  ├─ pages/
  ├─ features/
  ├─ components/
  ├─ ui/
  ├─ services/
  ├─ types/
  ├─ lib/
  ├─ styles/
  ├─ assets/
  └─ config/
```

## Getting Started
1. **Clone and run backend**
  ```bash
  git clone https://github.com/Henryrivardo07/be_restaurant_app_for_mentee.git
  cd be_restaurant_app_for_mentee
  npm install
  npm run dev
  ```
  Make sure the `.env` file in backend is filled.

2. **Clone and run frontend**
  ```bash
  git clone <repo-frontend-url>
  cd restaurant-frontend
  npm install
  npm run dev
  ```
  Make sure the `.env` file in frontend contains:
  ```env
  VITE_API_BASE_URL=http://localhost:8080
  ```

3. **Access the app**
  - Frontend: [http://localhost:5173](http://localhost:5173)
  - Backend: [http://localhost:8080](http://localhost:8080)

## Figma & Demo
- Figma: [Restaurant Batch 3](https://www.figma.com/design/cBj8kLBjpMXtlV9yMoxjI7/Restaurant---Batch-3--Copy-?node-id=37411-2452)
- Demo: (add deploy link if available)

## Acceptance Criteria
- Home displays menu list from backend with loading skeleton
- Filter/sort/search works and is stored in Redux
- Add to Cart works (optimistic); update qty & remove item
- Checkout form saves order
- Orders history displays submitted orders
- Mobile responsive & basic accessibility
- Clean, structured code and matches required stack

## Author
- Nura (add your name/username if needed)
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
