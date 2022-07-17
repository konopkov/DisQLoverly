import { inject, injectable } from "inversify";

import { TYPES } from "../../inversify.types";
import { arraysEqual } from "../../utils";
import { DockerContainer } from "./models/docker-container";
import { DockerStrategy } from "./models/docker-strategy";

import type {
  DockerServiceInterface,
  SubscriberFn,
} from "./models/docker-service";

@injectable()
export class DockerService implements DockerServiceInterface {
  private _subscribers: SubscriberFn[] = [];
  private _lastContainers: DockerContainer[] = [];
  private _refetchInterval: number = 1000;

  constructor(
    @inject(TYPES.DockerStrategy)
    private _dockerStrategy: DockerStrategy
  ) {
    setInterval(this.reFetch.bind(this), this._refetchInterval);
  }

  async getContainers(): Promise<DockerContainer[]> {
    return this._dockerStrategy.getContainers();
  }

  subscribe(subscriber: (containers: DockerContainer[]) => void): void {
    if (!this._subscribers.find((s) => s === subscriber))
      this._subscribers.push(subscriber);
  }

  private notify(newContainers: DockerContainer[]) {
    this._subscribers.forEach((subscriber) => subscriber(newContainers));
  }

  private async reFetch() {
    const newContainers = await this.getContainers();
    const equal = arraysEqual(newContainers, this._lastContainers);

    if (!equal) {
      this.notify(newContainers);
      this._lastContainers = newContainers;
    }
  }
}
