import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Frontpage from './views/Frontpage/Frontpage';
import ErrorComponent from './components/ErrorComponent/Error';

const routes = createRoutesFromElements(
    <Route
        path="/"
        errorElement={<ErrorComponent />}
    >
        <Route
            index
            element={<Frontpage />}
        />
        <Route
            path="/start"
            lazy={() => import('./views/Tutorial/Tutorial').then((mod) => ({ element: <mod.default /> }))}
        />
        <Route
            path="/about"
            lazy={() => import('./views/About/About').then((mod) => ({ element: <mod.default /> }))}
        />
        <Route
            path="/play"
            lazy={() => import('./views/GameView/GameView').then((mod) => ({ element: <mod.default /> }))}
        />
    </Route>
);

export const router = createBrowserRouter(routes);
