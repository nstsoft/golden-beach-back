import { EventDataSource, ImageDataSource, UserDataSource } from './data-source';
import { EventService, ImageService, UserService } from './services';

const userService = new UserService(new UserDataSource());
const eventService = new EventService(new EventDataSource());
const imageService = new ImageService(new ImageDataSource());

export { eventService, imageService, userService };
