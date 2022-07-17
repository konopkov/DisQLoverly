import { GraphQLEndpoint } from "./graphql-endpoint";

export interface GraphQLServiceInterface {
  start(endpoints: GraphQLEndpoint[]): void;
  stop(): void;
  reConfigure(endpoints: GraphQLEndpoint[]): void;
}
