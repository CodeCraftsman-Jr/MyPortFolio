import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ContentProvider } from "./content/ContentProvider";

// The admin is a separate chunk; visitors never download it.
const AdminApp = lazy(() => import("./admin/AdminApp"));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ContentProvider><Index /></ContentProvider>} />
      <Route path="/admin/*" element={<Suspense fallback={null}><AdminApp /></Suspense>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
