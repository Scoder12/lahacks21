import { dedupExchange, Exchange, fetchExchange } from "@urql/core";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import Router from "next/router";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "src/generated/graphql";
import { pipe, tap } from "wonka";
import { betterUpdateQuery } from "./betterUpdateQuery";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/login");
      }
    })
  );
};

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      //info.partial = true;
      return undefined;
    }

    //const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const fieldKey = cache.keyOfField(fieldName, fieldArgs);
    if (!fieldKey)
      throw new Error("Unexpected state: Unable to generate fieldKey");
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "projects"
    );
    info.partial = !isItInTheCache;

    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      console.log(fi);
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      hasMore = hasMore && (cache.resolve(key, "hasMore") as boolean);
      const data = cache.resolve(key, "projects") as string[];
      results.push(...data);
    });

    return { __typename: "PaginatedProjects", hasMore, projects: results };
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  // TODO: Configure URL for prod
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedProjects: () => null,
        SnippetResponse: () => null,
      },
      resolvers: {
        Query: {
          projects: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({
                me: null,
              })
            );
          },
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return { me: result.login.user };
                }
              }
            );
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return { me: result.register.user };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
