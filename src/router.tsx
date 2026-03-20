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
    </Route>
);

export const router = createBrowserRouter(routes);
