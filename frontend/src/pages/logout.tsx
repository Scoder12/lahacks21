import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Skeletons from "src/components/Skeletons";
import { useLogoutMutation } from "src/generated/graphql";
import { createUrqlClient } from "src/utils/createUrqlClient";

function Logout() {
  const router = useRouter();
  const [{ fetching }] = useLogoutMutation();

  if (!fetching) {
    router.push("/");
  }

  return <Skeletons count={5} />;
}

export default withUrqlClient(createUrqlClient)(Logout);
