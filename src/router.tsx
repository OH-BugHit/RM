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
            path="/import"
            lazy={() => import('./views/PlayEnv/PlayEnv').then((mod) => ({ element: <mod.default /> }))}
        />
        <Route
            path="/student"
            lazy={() => import('./views/StudentView/StudentView').then((mod) => ({ element: <mod.default /> }))}
        />
        <Route
            path="/build"
            lazy={() => import('./views/BuildView/BuildView').then((mod) => ({ element: <mod.default /> }))}
        />
        <Route
            path="/teacher/"
            lazy={() => import('./views/Teacher/TeacherWrapper').then((mod) => ({ element: <mod.default /> }))}
        />
        <Route
            path="/student/:serverCode/main"
            lazy={() =>
                import('./views/StudentView/Student/StudentWrapper').then((mod) => ({ element: <mod.default /> }))
            }
        />
        <Route
            path="/student/single/main"
            lazy={() =>
                import('./views/StudentView/SinglePlayer/SinglePlayer').then((mod) => ({ element: <mod.default /> }))
            }
        />
    </Route>
);

export const router = createBrowserRouter(routes);
