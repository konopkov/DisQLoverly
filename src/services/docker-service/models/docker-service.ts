import { DockerContainer } from "./docker-container";

export type SubscriberFn = (containers: DockerContainer[]) => void;

export interface DockerServiceInterface {
  getContainers(): Promise<DockerContainer[]>;
  subscribe(subscriber: SubscriberFn): void;
}
