import { UserDataSource } from './data-source';
import { UserService } from './services';

const userService = new UserService(new UserDataSource());

export { userService };
