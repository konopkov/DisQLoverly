import { inject, injectable } from "inversify";

import { TYPES } from "../../inversify.types";
import { GraphQLEndpoint } from "./models/graphql-endpoint";
import { GraphQLServerStrategy } from "./models/graphql-server-strategy";
import { GraphQLServiceInterface } from "./models/graphql-service";

@injectable()
export class GraphQLService implements GraphQLServiceInterface {
  constructor(
    @inject(TYPES.GraphQLServerStrategy)
    private _graphQLServer: GraphQLServerStrategy
  ) {}

  start(endpoints: GraphQLEndpoint[]): void {
    this._graphQLServer.start(endpoints);
  }
  stop(): void {
    this._graphQLServer.stop();
  }
  reConfigure(endpoints: GraphQLEndpoint[]): void {
    this._graphQLServer.reConfigure(endpoints);
  }
}
