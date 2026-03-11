import { useState } from "react";

export function useOutputType(defaultType) {
  const [outputType, setOutputType] = useState(defaultType);
  return { outputType, setOutputType };
}
