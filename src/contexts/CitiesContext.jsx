import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
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

  // Fetch Current City
  async function getCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("There was an error loading data");

      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  // create newCity from Form
  async function createCity(newCity) {
    try {
      setIsLoading(true);

      // Update Remote state
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      // console.log(data);

      // Update UI state
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city");
    } finally {
      setIsLoading(false);
    }
  }

  // Delete city
  async function deleteCity(id) {
    try {
      setIsLoading(true);

      // Submit the request to url with id
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert("There was an error deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
