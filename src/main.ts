import { Container } from "inversify";
import { App } from "./app.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { SYMBOLS } from "./symbols.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { ContainerModule } from "inversify/lib/container/container_module.js";
import { interfaces } from "inversify/lib/interfaces/interfaces.js";
import { IUserController } from "./users/users.interface.js";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(SYMBOLS.ILogger).to(LoggerService);
  bind<IExeptionFilter>(SYMBOLS.ExeptionFilter).to(ExeptionFilter);
  bind<IUserController>(SYMBOLS.UserController).to(UserController);
  bind<App>(SYMBOLS.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(SYMBOLS.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
