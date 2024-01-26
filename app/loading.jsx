import React from "react";
import { Progress } from "@nextui-org/react";
const Loading = () => {
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      //   className="max-w-md"
    />
  );
};

export default Loading;
