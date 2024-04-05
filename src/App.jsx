import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/citylist/CityList";
import CountryList from "./components/countrylist/CountryList";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useState(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("There was an error loading data");

        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* Index route is the default children route when there is no chilren routes specified */}
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
