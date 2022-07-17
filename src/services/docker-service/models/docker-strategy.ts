import type { DockerContainer } from "./docker-container";

export interface DockerStrategy {
  getContainers(): Promise<DockerContainer[]>;
}
