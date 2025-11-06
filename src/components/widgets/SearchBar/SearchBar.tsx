// import { useState, useEffect } from "react";
// import {
//   TextInput,
//   ActionIcon,
//   Group,
//   Button,
//   Transition,
//   Flex,
//   Badge,
//   Box,
//   useMantineColorScheme,
// } from "@mantine/core";
// import {
//   IconSearch,
//   IconX,
//   IconPencil,
//   IconAlertCircle,
// } from "@tabler/icons-react";
// import { notifications } from "@mantine/notifications";
// import { useNavigate } from "react-router-dom";
// import { useWeatherStore } from "../../store/weatherStore";
// import { InfoTooltip } from "../../shared/components/InfoTooltip";
// import { useMediaQuery } from "@mantine/hooks";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [editing, setEditing] = useState(false);
//   const navigate = useNavigate();
//   const { city, setCity, fetchWeatherData, weatherError, clearWeatherError } =
//     useWeatherStore();

//   const { colorScheme } = useMantineColorScheme();
//   const isDark = colorScheme === "dark";

//   const mobile = useMediaQuery("(max-width: 767px)");

//   const handleSearch = async () => {
//     const trimmed = query.trim();
//     if (trimmed) {
//       try {
//         await fetchWeatherData(trimmed);
//         navigate(`/city`);
//         setQuery("");
//         setEditing(false);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleClear = () => setQuery("");

//   useEffect(() => {
//     if (weatherError) {
//       notifications.clean();
//       notifications.show({
//         id: "weather-error",
//         color: "red",
//         title: "Weather request failed",
//         icon: <IconAlertCircle size={20} />,
//         autoClose: 8000,
//         withCloseButton: true,
//         message:
//           weatherError === "City not found" ? (
//             <div style={{ lineHeight: 1.5 }}>
//               <span>
//                 No results found. Please check for <strong>typos</strong> or try
//                 a different <strong>spelling</strong>.
//               </span>
//               <br />
//               <span>
//                 Ensure the city name is written in{" "}
//                 <strong>English letters</strong>.
//               </span>
//             </div>
//           ) : (
//             weatherError
//           ),
//         styles: (theme) => ({
//           root: {
//             maxWidth: 440,
//             padding: "16px 18px",
//             borderRadius: theme.radius.md,
//             backgroundColor:
//               colorScheme === "dark"
//                 ? theme.colors.dark[7]
//                 : theme.colors.red[0],
//             border: `1px solid ${
//               colorScheme === "dark" ? theme.colors.red[7] : theme.colors.red[4]
//             }`,
//           },
//           title: { fontWeight: 700, marginBottom: 6 },
//           description: { fontSize: theme.fontSizes.sm },
//           icon: { marginTop: 4 },
//         }),
//       });

//       clearWeatherError();
//     }
//   }, [weatherError, clearWeatherError]);

//   if (city && !editing) {
//     return (
//       <Box
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: mobile ? 4 : 6,
//           maxWidth: mobile ? 220 : 280,
//           border: `1px solid ${
//             isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
//           }`,
//           borderRadius: "999px",
//           padding: mobile ? "3px 6px" : "4px 8px",
//           background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)",
//           backdropFilter: "blur(6px)",
//         }}
//       >
//         <Badge
//           variant="light"
//           radius="xl"
//           style={{
//             fontWeight: 600,
//             textTransform: "uppercase",
//             letterSpacing: "0.03em",
//             flexGrow: 1,
//             color: isDark ? "#fff" : "#333",
//             background: "transparent",
//             border: "none",
//             boxShadow: "none",
//             fontSize: mobile ? "0.65rem" : "0.75rem",
//           }}
//         >
//           {city}
//         </Badge>

//         <Group gap={mobile ? 2 : 4} style={{ flexShrink: 0 }}>
//           <ActionIcon
//             size={mobile ? "xs" : "sm"}
//             radius="xl"
//             color={isDark ? "gray" : "dark"}
//             variant="subtle"
//             onClick={() => setEditing(true)}
//             title="Edit city"
//           >
//             <IconPencil size={mobile ? 10 : 12} />
//           </ActionIcon>

//           <ActionIcon
//             size={mobile ? "xs" : "sm"}
//             radius="xl"
//             color={isDark ? "gray" : "dark"}
//             variant="subtle"
//             onClick={() => setCity(null)}
//             title="Clear city"
//           >
//             <IconX size={mobile ? 12 : 14} />
//           </ActionIcon>
//         </Group>
//       </Box>
//     );
//   }

//   return (
//     <Transition mounted={editing || !city} transition="fade" duration={200}>
//       {(styles) => (
//         <Flex
//           style={{
//             ...styles,
//             maxWidth: "100%",
//           }}
//           align="center"
//           gap={mobile ? 4 : 6}
//         >
//           {!mobile && (
//             <InfoTooltip
//               size={20}
//               label="Search works with English names only."
//             />
//           )}
//           <TextInput
//             value={query}
//             onChange={(e) => setQuery(e.currentTarget.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             placeholder="Enter city name..."
//             size={mobile ? "sm" : "xs"}
//             radius="xl"
//             leftSection={
//               <ActionIcon
//                 size={mobile ? "sm" : "sm"}
//                 radius="xl"
//                 color="blue"
//                 variant="subtle"
//                 onClick={handleSearch}
//                 title="Search"
//               >
//                 <IconSearch size={mobile ? 14 : 16} />
//               </ActionIcon>
//             }
//             rightSection={
//               query ? (
//                 <ActionIcon
//                   size={mobile ? "xs" : "sm"}
//                   radius="xl"
//                   color="gray"
//                   variant="subtle"
//                   onClick={handleClear}
//                   title="Clear"
//                 >
//                   <IconX size={mobile ? 12 : 14} />
//                 </ActionIcon>
//               ) : null
//             }
//             styles={{
//               input: {
//                 textAlign: "start",
//                 fontWeight: 500,
//                 paddingLeft: mobile ? "2rem" : "2.25rem",
//                 paddingRight: query ? (mobile ? "2rem" : "2.25rem") : "0.75rem",
//                 fontSize: mobile ? "0.8rem" : "0.9rem",
//               },
//             }}
//             style={{
//               width: "100%",
//               maxWidth: mobile ? 220 : 280,
//             }}
//           />

//           {city && (
//             <Button
//               variant="subtle"
//               color="gray"
//               size={mobile ? "compact-xs" : "xs"}
//               radius="xl"
//               onClick={() => setEditing(false)}
//               style={{
//                 flexShrink: 0,
//                 display: "block",
//                 fontSize: mobile ? "0.7rem" : "0.8rem",
//                 padding: mobile ? "2px 6px" : undefined,
//               }}
//             >
//               Cancel
//             </Button>
//           )}
//         </Flex>
//       )}
//     </Transition>
//   );
// };

// export default SearchBar;

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
