import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layouts from '../templates/layouts';

const Home = lazy(() => import('../pages/home/home'));

function ComingSoon({ title }) {
  return (
    <main className="min-h-[60vh] grid place-items-center px-4">
      <div className="parchment p-8 text-center max-w-2xl">
        <h1 className="section-title">{title}</h1>
        <p>This route exists for parity with the HTML reference and will be migrated next.</p>
      </div>
    </main>
  );
}

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
          <Route path="thankyou" element={<ComingSoon title="Thank You" />} />
          <Route path="CMREF" element={<ComingSoon title="CMREF Portfolio" />} />
          <Route path="blogs" element={<ComingSoon title="Blogs" />} />
          <Route path="blogs/blog" element={<ComingSoon title="Blog Details" />} />
          <Route path="fallingletters" element={<ComingSoon title="Falling Letters" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
