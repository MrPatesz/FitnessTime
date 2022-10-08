import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { QueryComponent } from "../../components/QueryComponent";
import UserService from "../../services/UserService";

export default function UserDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const userService = UserService();
  const userDetailsQuery = userService.useGetSingle(id?.toString());
  const useUpdate = userService.useUpdate();

  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    if (userDetailsQuery.data?.introduction) {
      setIntroduction(userDetailsQuery.data.introduction);
    }
  }, [userDetailsQuery.data]);

  const updateCall = () => {
    if (userDetailsQuery.data) {
      useUpdate.mutate({
        ...userDetailsQuery.data,
        introduction: introduction,
      });
    }
  };

  return (
    <QueryComponent resourceName={"User Details"} query={userDetailsQuery}>
      <h1>{userDetailsQuery.data?.username}</h1>
      <input
        value={introduction}
        onChange={(event) => setIntroduction(event.currentTarget.value)}
      />
      <h3>{JSON.stringify(userDetailsQuery.data)}</h3>
      <button onClick={updateCall}>Update</button>
    </QueryComponent>
  );
}
