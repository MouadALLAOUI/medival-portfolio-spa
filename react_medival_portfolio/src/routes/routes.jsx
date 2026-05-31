import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layouts from '../templates/layouts';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const Home = lazy(() => import('../pages/home/home'));
const ThankYou = lazy(() => import('../pages/thankyou/thankyou'));
const CRMEF = lazy(() => import('../pages/CRMEF/CrmefPage'));
const BlogsPage = lazy(() => import('../pages/blogs/BlogsPage'));
const BlogPost = lazy(() => import('../pages/blogs/BlogPost'));
const FallingLetters = lazy(() => import('../pages/fallingletters/fallingletters'));
const PrivacyPage = lazy(() => import('../pages/Privacy/PrivacyPage'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));
const AchievementsPage = lazy(() => import('../pages/Achievements/AchievementsPage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ProjectDetailsPage = lazy(() => import('../pages/Projects/ProjectDetailsPage'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

// Helper to prefetch lazy routes
export const prefetchRoute = (factory) => {
  const component = factory();
  if (component && component.catch) {
    component.catch(() => { });
  }
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:slug" element={<BlogPost />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Standalone pages — no header / footer */}
        <Route path="fallingletters" element={<FallingLetters />} />
        <Route path="CRMEF" element={<CRMEF />} />
        <Route path="crmef" element={<CRMEF />} />
      </Routes>
    </Suspense>
  );
}
