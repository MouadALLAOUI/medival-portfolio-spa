import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layouts from '../templates/layouts';

const Home = lazy(() => import('../pages/home/home'));
const ThankYou = lazy(() => import('../pages/thankyou/thankyou'));
const CRMEF = lazy(() => import('../pages/CRMEF/CrmefPage'));
const BlogsPage = lazy(() => import('../pages/blogs/BlogsPage'));
const BlogPost = lazy(() => import('../pages/blogs/BlogPost'));
const FallingLetters = lazy(() => import('../pages/fallingletters/fallingletters'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] grid place-items-center text-parchment font-cinzel text-[18px]">
          Loading scroll…
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:slug" element={<BlogPost />} />
          <Route path="fallingletters" element={<FallingLetters />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="CRMEF" element={<CRMEF />} />
        <Route path="crmef" element={<CRMEF />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
