import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

import CityList from "./components/citylist/CityList";
import CountryList from "./components/countrylist/CountryList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";

// with lazyloading, we will load each of the pages as we need them. Automatically seperate the bundle into seperate chunks
// While these each chunk downloading, suspence api will suspend the page until js file downloaded and show the fallback
// once the requested js file for the page downloaded it will show its child component which was requested
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Before lazy loading bundles
// dist/index.html                   0.49 kB │ gzip:   0.32 kB
// dist/assets/icon-98c6b6d7.png    20.20 kB
// dist/assets/index-b9490b50.css   30.07 kB │ gzip:   5.06 kB
// dist/assets/index-6fc04923.js   514.35 kB │ gzip: 148.28 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Index route is the default children route when there is no chilren routes specified */}
                {/* react-router-dom gives us the Navigate component and it will redirect us to cities as soon as index route is hit. We have to 
          add replace keyword to go back to the browser history stack when clicking the back button of browser */}
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />

                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
