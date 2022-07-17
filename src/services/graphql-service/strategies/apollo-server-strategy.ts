import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import { injectable } from "inversify";

import { GraphQLEndpoint } from "../models/graphql-endpoint";
import { GraphQLServerStrategy } from "../models/graphql-server-strategy";

import type { ServiceEndpointDefinition } from "@apollo/gateway";

@injectable()
export class ApolloServerStrategy implements GraphQLServerStrategy {
  private _server: ApolloServer | undefined;

  async start(endpoints: GraphQLEndpoint[]): Promise<void> {
    const gateway = this.getGatewayInstance(endpoints);
    const server = new ApolloServer({ gateway });

    server.listen();
    this._server = server;
  }

  async reConfigure(endpoints: GraphQLEndpoint[]): Promise<void> {
    await this.stop();
    await this.start(endpoints);
  }

  async stop(): Promise<void> {
    if (this._server) {
      try {
        await this._server.stop();
      } catch (error) {}
    }
  }

  private getGatewayInstance(endpoints: GraphQLEndpoint[]) {
    const subgraphs = endpoints.map(this.endpointToSubGraph);
    const gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs,
      }),
    });

    return gateway;
  }

  private endpointToSubGraph(
    endpoint: GraphQLEndpoint
  ): ServiceEndpointDefinition {
    return {
      name: endpoint.serviceName,
      url: endpoint.url,
    };
  }
}
