import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeletons from "src/components/Skeletons";
import { useLogoutMutation } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

function RealLogout() {
  const router = useRouter();
  const [{ fetching }] = useLogoutMutation();

  if (!fetching) {
    router.push("/");
  }

  return <Skeletons count={5} />;
}

function Logout() {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);

  return isClient ? <RealLogout /> : <Skeletons count={5} />;
}

export default withUrqlClient(createUrqlClient)(Logout);
