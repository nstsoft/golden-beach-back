import { EventDataSource, ImageDataSource, MenuDataSource, UserDataSource } from './data-source';
import { EventService, ImageService, MenuService, UserService } from './services';

const userService = new UserService(new UserDataSource());
const eventService = new EventService(new EventDataSource());
const imageService = new ImageService(new ImageDataSource());
const menuService = new MenuService(new MenuDataSource());

export { eventService, imageService, menuService, userService };
