import { Card, Loader } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import React, { useEffect } from "react";
import DtoBase from "../models/dtoBase";

export const QueryComponent: React.FunctionComponent<{
  resourceName: string;
  query: UseQueryResult<DtoBase | DtoBase[], unknown>;
  children: JSX.Element | JSX.Element[];
  setState?: (newState: any) => void;
}> = ({ resourceName, query, children, setState }) => {
  useEffect(() => {
    if (setState && query.data) {
      setState(query.data);
    }
  }, [query.data, setState]);

  return (
    <>
      {query.error ? (
        <Card>An error occurred while fetching {resourceName}!</Card>
      ) : query.data ? (
        children
      ) : (
        query.isFetching && <Loader />
      )}
    </>
  );
};
