import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "src/generated/graphql";

export const useRequireLogin = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [data, fetching, router]);
};
