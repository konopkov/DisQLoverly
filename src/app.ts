import container from "./inversify.config";
import { TYPES } from "./inversify.types";
import { AppService } from "./services";

const app = container.get<AppService>(TYPES.AppService);
app.run();
