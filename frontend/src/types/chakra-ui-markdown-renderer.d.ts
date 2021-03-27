import { Renderers } from "react-markdown";

declare module "chakra-ui-markdown-renderer" {
  export const defaults: Renderers<any>;

  function ChakraUIRenderer(theme: Renderers<any>): Renderers<any>;
}
