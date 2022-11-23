import { Text, Stack, Card, Group, TextInput, ActionIcon } from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { QueryComponent } from "../../components/QueryComponent";
import UserDto from "../../models/userDto";
import UserService from "../../services/UserService";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ascending, setAscending] = useState<boolean>(true);
  const [filteredList, setFilteredList] = useState<UserDto[]>([]);

  const userService = UserService();
  const usersQuery = userService.useGetAll();

  useEffect(() => {
    if (usersQuery.data) {
      setFilteredList(
        usersQuery.data
          ?.filter((a) =>
            a.username.toLowerCase().includes(searchTerm.toLowerCase())
          )
          ?.sort((a, b) => {
            let returnValue = a.username.localeCompare(b.username);
            if (!ascending) {
              returnValue *= -1;
            }
            return returnValue;
          })
      );
    }
  }, [searchTerm, ascending, usersQuery.data]);

  return (
    <Stack>
      <Group align="end" position="apart">
        <TextInput
          sx={{ width: "300px" }}
          label="Search by Username"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          icon={<IconSearch />}
        />
        <TextInput
          sx={{ width: "300px" }}
          label="Order by"
          readOnly
          value="Username"
          rightSection={
            <ActionIcon onClick={() => setAscending(!ascending)}>
              {ascending ? <IconArrowUp /> : <IconArrowDown />}
            </ActionIcon>
          }
        />
      </Group>
      <QueryComponent resourceName={"Users"} query={usersQuery}>
        <Stack>
          {filteredList.map((user) => (
            <Link
              key={user.id}
              href={"/users/[id]"}
              as={`/users/${user.id}`}
              passHref
            >
              <Card component="a" withBorder>
                <Text sx={{ cursor: "pointer" }}>{user.username}</Text>
              </Card>
            </Link>
          ))}
        </Stack>
      </QueryComponent>
    </Stack>
  );
}
