import { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
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
