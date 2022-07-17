import { inject, injectable } from "inversify";

import { TYPES } from "../../inversify.types";
import { DockerService } from "../docker-service/docker-service";
import { DockerContainer } from "../docker-service/models/docker-container";
import { GraphQLEndpoint } from "../graphql-service/models/graphql-endpoint";

import type { GraphQLService } from "../graphql-service/graphql-service";
import type { AppServiceInterface } from "./models/app-service";

@injectable()
export class AppService implements AppServiceInterface {
  constructor(
    @inject(TYPES.DockerService)
    private _dockerService: DockerService,

    @inject(TYPES.GraphQLService)
    private _graphQLService: GraphQLService
  ) {}

  async run(): Promise<void> {
    const containers = await this._dockerService.getContainers();
    this._graphQLService.start(containers.map(this.containerToEndpoint));

    this.subscribeToChanges();
  }

  private subscribeToChanges() {
    this._dockerService.subscribe((newContainers) => {
      // Schedule re-configuration with delay to get server up and running
      setTimeout(() => {
        this._graphQLService.reConfigure(
          newContainers.map(this.containerToEndpoint)
        );
      }, 2000);
    });
  }

  private containerToEndpoint(container: DockerContainer): GraphQLEndpoint {
    return {
      serviceName: container.name,
      url: `http://${container.hostname}:${container.port}`,
    };
  }
}
