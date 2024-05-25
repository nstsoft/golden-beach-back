import { User } from 'entities';
import { generateAccessToken, generateRefreshToken } from 'helpers';
import CreateHttpError from 'http-errors';
import { IUserDataSource, IUserService } from 'interfaces';
import { Login } from 'types';

export class UserService implements IUserService {
  constructor(private userDataSource: IUserDataSource) {}

  findById(id: string) {
    return this.userDataSource.findOneById(id);
  }

  create(data: User): Promise<User> {
    console.log('create', data);
    return this.userDataSource.create(data);
  }

  async login(data: Login): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userDataSource.findOne({ email: data.email });

    const isValid = await user.comparePassword(data.password);
    if (!isValid) throw CreateHttpError.Unauthorized('Invalid email or password');

    const accessToken = generateAccessToken({ _id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ _id: user._id });

    return { user, accessToken, refreshToken };
  }
}
