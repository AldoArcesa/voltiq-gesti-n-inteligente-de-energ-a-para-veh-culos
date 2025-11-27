import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { GamificationPage } from '@/pages/GamificationPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { MarketplacePage } from '@/pages/MarketplacePage';
import { FleetPage } from '@/pages/FleetPage';
import { DemoPage } from '@/pages/DemoPage'; // Keep demo page for reference
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/gamification",
    element: <GamificationPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/alerts",
    element: <AlertsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/marketplace",
    element: <MarketplacePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/fleet",
    element: <FleetPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/demo", // Keep demo page accessible
    element: <DemoPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)