import { ActionIcon, Button, Flex, TextInput, Transition } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { InfoTooltip } from "../../../shared/components/InfoTooltip";
import { useWeatherStore } from "../../../store/weatherStore";
import { useTranslation } from "react-i18next";

interface SearchBarEditModeProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onCancel: () => void;
}

const SearchBarEditMode = ({
  query,
  onQueryChange,
  onSearch,
  onCancel,
}: SearchBarEditModeProps) => {
  const mobile = useMediaQuery("(max-width: 767px)");
  const { city } = useWeatherStore();
  const { t } = useTranslation();

  return (
    <Transition mounted transition="fade" duration={200}>
      {(styles) => (
        <Flex
          style={{
            ...styles,
            maxWidth: "100%",
          }}
          align="center"
          gap={mobile ? 4 : 6}
        >
          <InfoTooltip size={20} label={t("searchBar.englishOnlyHint")} />

          <TextInput
            value={query}
            onChange={(e) => onQueryChange(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder={t("searchBar.enterCity")}
            size={mobile ? "sm" : "xs"}
            radius="xl"
            leftSection={
              <ActionIcon
                size={mobile ? "sm" : "sm"}
                radius="xl"
                color="blue"
                variant="subtle"
                onClick={onSearch}
                title={t("searchBar.search")}
              >
                <IconSearch size={mobile ? 14 : 16} />
              </ActionIcon>
            }
            rightSectionWidth={mobile ? 30 : 36}
            rightSection={
              <ActionIcon
                size={mobile ? "xs" : "sm"}
                radius="xl"
                color="gray"
                variant="subtle"
                onClick={() => query && onQueryChange("")}
                title={t("searchBar.clear")}
                style={{
                  opacity: query ? 1 : 0,
                  pointerEvents: query ? "auto" : "none",
                  transition: "opacity 0.15s ease",
                }}
              >
                <IconX size={mobile ? 12 : 14} />
              </ActionIcon>
            }
            styles={{
              input: {
                textAlign: "start",
                fontWeight: 500,
                paddingLeft: mobile ? "2rem" : "2.25rem",
                fontSize: mobile ? "0.8rem" : "0.9rem",
              },
            }}
            style={{
              width: "100%",
              maxWidth: mobile ? 260 : 280,
            }}
          />

          {city && (
            <Button
              variant="subtle"
              color="gray"
              size={mobile ? "compact-xs" : "xs"}
              radius="xl"
              onClick={onCancel}
              style={{
                flexShrink: 0,
                display: "block",
                fontSize: mobile ? "0.7rem" : "0.8rem",
                padding: mobile ? "2px 6px" : undefined,
              }}
            >
              {t("searchBar.cancel")}
            </Button>
          )}
        </Flex>
      )}
    </Transition>
  );
};

export default SearchBarEditMode;
