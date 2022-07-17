import { GraphQLEndpoint } from "./graphql-endpoint";

export interface GraphQLServerStrategy {
  start(endpoints: GraphQLEndpoint[]): void;
  stop(): void;
  reConfigure(endpoints: GraphQLEndpoint[]): void;
}
