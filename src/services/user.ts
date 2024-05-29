import { generateAccessToken, generateRefreshToken } from 'helpers';
import CreateHttpError from 'http-errors';
import { IRawUser, IUserDataSource, IUserService } from 'interfaces';
import { Login, UserType } from 'types';

export class UserService implements IUserService {
  constructor(private userDataSource: IUserDataSource) {}

  findById(id: string) {
    return this.userDataSource.findOneById(id);
  }

  create(data: IRawUser) {
    return this.userDataSource.create(data);
  }

  async login(data: Login) {
    const user = await this.userDataSource.findOne({ email: data.email });

    const isValid = await user.comparePassword(data.password);
    if (!isValid) throw CreateHttpError.Unauthorized('Invalid email or password');

    const accessToken = generateAccessToken({ _id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ _id: user._id });

    return { user, accessToken, refreshToken };
  }

  findAll(criteria: Partial<UserType>) {
    return this.userDataSource.findAll(criteria);
  }
}
