import {
  ActionIcon,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import EventDto from "../../models/eventDto";

enum OrderBy {
  NAME,
  DATE,
  LOCATION,
  PRICE,
}

const orderByValues = [
  { value: OrderBy[OrderBy.NAME] ?? "", label: "Name" },
  { value: OrderBy[OrderBy.DATE] ?? "", label: "Date" },
  { value: OrderBy[OrderBy.LOCATION] ?? "", label: "Location" },
  { value: OrderBy[OrderBy.PRICE] ?? "", label: "Price" },
];

enum FilterBy {
  FREE,
  NO_EQUIPMENT,
  LIMITED,
}

const filterValues = [
  { value: FilterBy[FilterBy.FREE] ?? "", label: "Free" },
  { value: FilterBy[FilterBy.NO_EQUIPMENT] ?? "", label: "No Equipment" },
  { value: FilterBy[FilterBy.LIMITED] ?? "", label: "Limited" },
];

export const FilterEventsComponent: React.FunctionComponent<{
  filterKey: string;
  events: EventDto[];
  setFilteredEvents: (filteredList: EventDto[]) => void;
}> = ({ filterKey, events, setFilteredEvents }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tags, setTags] = useLocalStorage<string[]>({
    key: filterKey,
    defaultValue: [],
  });
  const [orderBy, setOrderBy] = useState<string>(OrderBy[OrderBy.DATE] ?? "");
  const [ascending, setAscending] = useState<boolean>(true);

  useEffect(() => {
    setFilteredEvents(
      events
        ?.filter((a) => {
          const free = !a.price;
          const noEquipment = !a.equipment;
          const limited = !!a.limit;

          return (
            (!tags.includes(FilterBy[FilterBy.FREE] ?? "") || free) &&
            (!tags.includes(FilterBy[FilterBy.NO_EQUIPMENT] ?? "") ||
              noEquipment) &&
            (!tags.includes(FilterBy[FilterBy.LIMITED] ?? "") || limited)
          );
        })
        ?.filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
        ?.sort((a, b) => {
          let returnValue = 0;
          switch (orderBy) {
            case OrderBy[OrderBy.NAME]: {
              returnValue = a.name.localeCompare(b.name);
              break;
            }
            case OrderBy[OrderBy.DATE]: {
              returnValue =
                new Date(a.from).getTime() - new Date(b.from).getTime();
              break;
            }
            case OrderBy[OrderBy.LOCATION]: {
              returnValue = a.location.address.localeCompare(
                b.location.address
              );
              break;
            }
            case OrderBy[OrderBy.PRICE]: {
              returnValue = (a.price ?? 0) - (b.price ?? 0);
              break;
            }
          }
          if (!ascending) {
            returnValue *= -1;
          }
          return returnValue;
        })
    );
  }, [events, searchTerm, tags, orderBy, ascending]);

  return (
    <Group align="end" position="apart">
      <TextInput
        sx={{ width: "300px" }}
        label="Search by Name"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        icon={<IconSearch />}
      />
      <MultiSelect
        sx={{ minWidth: "300px", maxWidth: "320px" }}
        data={filterValues}
        label="Filter by Attributes"
        value={tags}
        onChange={(event) => setTags(event)}
      />
      <Select
        rightSection={
          <ActionIcon onClick={() => setAscending(!ascending)}>
            {ascending ? <IconArrowUp /> : <IconArrowDown />}
          </ActionIcon>
        }
        sx={{ width: "300px" }}
        data={orderByValues}
        label="Order by"
        value={orderBy}
        onChange={(event) => setOrderBy(event ?? "Name")}
      />
    </Group>
  );
};
