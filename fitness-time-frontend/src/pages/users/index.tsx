import Link from "next/link";
import React from "react";
import { QueryComponent } from "../../components/QueryComponent";
import UserService from "../../services/UserService";

export default function UsersPage() {
  const userService = UserService();
  const usersQuery = userService.useGetAll();
  const deleteUser = userService.useDelete();
  const createUser = userService.useCreate();

  return (
    <>
      <button
        onClick={() =>
          createUser.mutate({
            username: "MrPatesz",
            password: "leaked_pw",
          })
        }
      >
        Create
      </button>
      <QueryComponent resourceName={"Users"} query={usersQuery}>
        <ul>
          {usersQuery.data?.map((event) => (
            <li key={event.id}>
              <Link href={`/users/${event.id}`}>{event.username}</Link>
              <button onClick={() => deleteUser.mutate(event.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </QueryComponent>
    </>
  );
}
