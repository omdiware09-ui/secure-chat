import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import FeaturesPage from '@/components/pages/FeaturesPage';
import DesignPreviewPage from '@/components/pages/DesignPreviewPage';
import LoginPage from '@/components/pages/LoginPage';
import SignupPage from '@/components/pages/SignupPage';
import VaultPinPage from '@/components/pages/VaultPinPage';
import ChatPage from '@/components/pages/ChatPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "features",
        element: <FeaturesPage />,
        routeMetadata: {
          pageIdentifier: 'features',
        },
      },
      {
        path: "design",
        element: <DesignPreviewPage />,
        routeMetadata: {
          pageIdentifier: 'design',
        },
      },
      {
        path: "login",
        element: <LoginPage />,
        routeMetadata: {
          pageIdentifier: 'login',
        },
      },
      {
        path: "signup",
        element: <SignupPage />,
        routeMetadata: {
          pageIdentifier: 'signup',
        },
      },
      {
        path: "vault-pin",
        element: <VaultPinPage />,
        routeMetadata: {
          pageIdentifier: 'vault-pin',
        },
      },
      {
        path: "chat",
        element: <ChatPage />,
        routeMetadata: {
          pageIdentifier: 'chat',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
