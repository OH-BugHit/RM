import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { Spinner } from '@genai-fi/base';
import { router } from './router';

function App() {
    return (
        <Suspense
            fallback={
                <div>
                    loading...
                    <Spinner />
                </div>
            }
        >
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
