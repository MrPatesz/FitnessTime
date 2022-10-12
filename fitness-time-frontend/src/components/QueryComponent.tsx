import { Loader } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import DtoBase from "../models/dtoBase";

export const QueryComponent: React.FunctionComponent<{
  resourceName: string;
  query: UseQueryResult<DtoBase | DtoBase[], unknown>;
  children: JSX.Element | JSX.Element[];
}> = ({ resourceName, query, children }) => {
  // TODO styling
  return (
    <>
      {query.error ? (
        <div>An error occurred while fetching {resourceName}!</div>
      ) : query.data ? (
        children
      ) : (
        query.isFetching && <Loader />
      )}
    </>
  );
};
