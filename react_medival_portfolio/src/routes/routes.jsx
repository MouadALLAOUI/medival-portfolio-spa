import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layouts from "../templates/layouts";

export default function AppRoutes() {

    const Home = lazy(() => import("../pages/home/home"));

    return (
        <Suspense fallback={
            <div className="min-h-[60vh] grid place-items-center text-parchment font-cinzel text-[18px]">
                Loading scroll…
            </div>
        }>
            <Routes>
                <Route path="/" element={<Layouts />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="projects" element={<Home />} />
                    <Route path="CMREF" element={<Home />} />
                    <Route path="blogs" element={<Home />} />
                    <Route path="fallingletters" element={<Home />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}