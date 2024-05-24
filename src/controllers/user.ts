import { IUserData, IUserService } from '../interfaces';
import { BaseController, Controller, Get, Post } from '../utils';

@Controller('/user')
export class UserController extends BaseController {
  constructor(private userService: IUserService) {
    super();
  }

  @Get('/')
  async get() {
    console.log('Hello World!');
    return 'body';
  }

  @Post('/')
  async post({ body }: { body: IUserData }) {
    return this.userService.create(body);
  }
}
