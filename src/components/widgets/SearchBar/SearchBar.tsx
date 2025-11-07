import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../../store/weatherStore";
import { useWeatherNotifications } from "../../../hooks/useWeatherNotifications";
import SearchBarViewMode from "./SearchBarViewMode";
import SearchBarEditMode from "./SearchBarEditMode";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const { city, setCity, fetchWeatherData, weatherError, clearWeatherError } =
    useWeatherStore();

  useWeatherNotifications(weatherError, clearWeatherError);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    try {
      await fetchWeatherData(trimmed);
      navigate("/city");
      setQuery("");
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (city && !editing)
    return (
      <SearchBarViewMode
        city={city}
        onEdit={() => setEditing(true)}
        onClear={() => setCity(null)}
      />
    );

  return (
    <SearchBarEditMode
      query={query}
      onQueryChange={setQuery}
      onSearch={handleSearch}
      onCancel={() => setEditing(false)}
    />
  );
};

export default SearchBar;
