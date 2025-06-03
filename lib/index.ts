import DataController from './controllers/data.controller';
import App from './app';
import IndexController from "./controllers/index.controller";
import UserController from './controllers/user.controller';
import TokenService from './modules/services/token.service';
import Controller from 'interfaces/controller.interface';
import { Server } from 'socket.io';
import DataService from './modules/services/data.service';
import UserService from './modules/services/user.service';
import PasswordService from './modules/services/password.service';

const app: App = new App([]);
const io = app.getIo();

function createControllers(io: Server): Controller[] {
    const dataService = new DataService();
    const userService = new UserService();
    const passwordService = new PasswordService();
    const tokennService = new TokenService();

    return [
        new DataController(dataService),
        new UserController(userService, passwordService, tokennService),
        new IndexController(),
    ];
}

const controllers = createControllers(io);

controllers.forEach((controller) => {
    app.app.use("/", controller.router);
});

// const app: App = new App([
//     new UserController(),
//     new DataController(),
//     // new IndexController()
// ]);

const tokenService = new TokenService();

setInterval(() => {
    tokenService.removeExpiredTokens();
}, 60 * 60 * 1000); // co 1 godzine

app.listen();