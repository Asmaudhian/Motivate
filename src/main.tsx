import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Users from './features/Users/Users';
import Header from './components/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const STALE_AFTER_10_MINUTES = 1000 * 60 * 10;

const router = createBrowserRouter([
	{
		path: '/',
		element: <Users />,
	},
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: STALE_AFTER_10_MINUTES,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Header />
		<div className="m-auto w-4/5 ">
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</div>
	</React.StrictMode>
);
