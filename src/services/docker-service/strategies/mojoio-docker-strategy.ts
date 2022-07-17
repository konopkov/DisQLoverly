import {
  DockerContainer as MojoioDockerContainer,
  DockerHost,
} from "@mojoio/docker";
import { injectable } from "inversify";

import { DockerContainer } from "../models/docker-container";
import { DockerStrategy } from "../models/docker-strategy";

@injectable()
export class MojojoDockerStrategy implements DockerStrategy {
  private _dockerHost: DockerHost;

  constructor() {
    this._dockerHost = new DockerHost();
  }

  async getContainers(): Promise<DockerContainer[]> {
    const containers = await this._dockerHost.getContainers();

    return containers
      .filter(this.filterPubliclyExposed)
      .map(this.fromMojoioContainer);
  }

  private fromMojoioContainer(
    container: MojoioDockerContainer
  ): DockerContainer {
    return {
      name: container.Names[0].replace("/", ""),
      hostname: Object.values(container.NetworkSettings.Networks)[0]?.IPAddress,
      port: container.Ports[0].PrivatePort,
    };
  }

  private filterPubliclyExposed(container: MojoioDockerContainer) {
    return (
      container.Ports[0]?.PrivatePort &&
      // @ts-ignore
      container.Ports[0]?.PublicPort === undefined
    );
  }
}
