import './App.css';
import { RouterProvider } from 'react-router';
import { Suspense } from 'react';
import { Spinner } from '@genai-fi/base';
import { router } from './router';

function App() {
    return (
        <Suspense
            fallback={
                <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: ' center' }}>
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
