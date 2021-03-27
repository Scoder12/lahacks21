import { Skeleton } from "@chakra-ui/skeleton";
import { FC } from "react";

interface SkeletonsProps {
  count?: number;
}

const Skeletons: FC<SkeletonsProps> = ({ count = 5 }: SkeletonsProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
};

export default Skeletons;
