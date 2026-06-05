import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layouts from '../templates/layouts';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import PageTransition from '../components/PageTransition';

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
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layouts />}>
            <Route index element={<PageTransition><Home /></PageTransition>} />
            <Route path="home" element={<PageTransition><Home /></PageTransition>} />
            <Route path="thankyou" element={<PageTransition><ThankYou /></PageTransition>} />
            <Route path="blogs" element={<PageTransition><BlogsPage /></PageTransition>} />
            <Route path="blogs/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
            <Route path="settings" element={<PageTransition><SettingsPage /></PageTransition>} />
            <Route path="achievements" element={<PageTransition><AchievementsPage /></PageTransition>} />
            <Route path="projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="projects/:id" element={<PageTransition><ProjectDetailsPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Route>
          {/* Standalone pages — no header / footer */}
          <Route path="fallingletters" element={<FallingLetters />} />
          <Route path="CRMEF" element={<CRMEF />} />
          <Route path="crmef" element={<CRMEF />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
