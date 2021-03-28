import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Skeletons from "src/components/Skeletons";
import { useLogoutMutation } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

function Logout() {
  const router = useRouter();
  const [, logout] = useLogoutMutation();

  useEffect(() => {
    (async () => {
      const { error } = await logout();
      if (error) alert(error);
      router.push("/");
    })();
  }, []);

  return <Skeletons count={5} />;
}

export default withUrqlClient(createUrqlClient)(Logout);
