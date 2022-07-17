import "reflect-metadata";

import { Container } from "inversify";

import { TYPES } from "./inversify.types";
import {
  ApolloServerStrategy,
  AppService,
  DockerService,
  GraphQLService,
  MojojoDockerStrategy,
} from "./services";
import { DockerStrategy } from "./services/docker-service/models/docker-strategy";
import { GraphQLServerStrategy } from "./services/graphql-service/models/graphql-server-strategy";

let container = new Container({
  defaultScope: "Singleton",
});

container.bind<DockerService>(TYPES.DockerService).to(DockerService);
container.bind<DockerStrategy>(TYPES.DockerStrategy).to(MojojoDockerStrategy);

container.bind<GraphQLService>(TYPES.GraphQLService).to(GraphQLService);
container
  .bind<GraphQLServerStrategy>(TYPES.GraphQLServerStrategy)
  .to(ApolloServerStrategy);

container.bind<AppService>(TYPES.AppService).to(AppService);

export default container;
