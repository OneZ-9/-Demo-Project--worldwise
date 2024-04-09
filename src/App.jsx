import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/citylist/CityList";
import CountryList from "./components/countrylist/CountryList";
import City from "./components/City/City";
import Form from "./components/form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            {/* Index route is the default children route when there is no chilren routes specified */}
            {/* react-router-dom gives us the Navigate component and it will redirect us to cities as soon as index route is hit. We have to 
          add replace keyword to go back to the browser history stack when clicking the back button of browser */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />

            <Route path="cities/:id" element={<City />} />

            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
