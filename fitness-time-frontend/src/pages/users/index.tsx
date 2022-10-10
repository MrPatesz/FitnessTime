import Link from "next/link";
import React from "react";
import { QueryComponent } from "../../components/QueryComponent";
import LoginDto from "../../models/loginDto";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

export default function UsersPage() {
  const userService = UserService();
  const authService = AuthService();
  const usersQuery = userService.useGetAll();
  const deleteUser = userService.useDelete();

  const mockUser: LoginDto = {
    username: "MrPatesz",
    password: "leaked_pw",
  };

  return (
    <>
      <button onClick={() => authService.register(mockUser)}>Create</button>
      <button
        onClick={async () => {
          const jwt = await authService.login(mockUser);
          console.log(jwt);
        }}
      >
        Login
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
