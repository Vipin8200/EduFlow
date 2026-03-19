import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { publicRoutes, protectedRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Layout) */}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {/* Protected Routes (With Sidebar/MainLayout) */}
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <MainLayout>
                <route.component />
              </MainLayout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;