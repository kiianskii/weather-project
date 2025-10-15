import { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = query.trim();

    if (city) {
      if (location.pathname.startsWith("/city")) {
        navigate(`/city/${city}`);
      }
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
      <Group justify="center">
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="Enter city name..."
          leftSection={<IconSearch size={18} />}
          style={{ flexGrow: 1 }}
        />
        <Button type="submit">Search</Button>
      </Group>
    </form>
  );
};

export default SearchBar;
