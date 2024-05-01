import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { jwtPayload } from 'types/jwt-payload';
import { UserService } from '../user/user.service';
import { UserEntity, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !user.password) throw new NotFoundException('User not found');
    if (await compare(pass, user.password)) {
      //   const { password, ...result } = user;
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async attachUser(jwtPayload: jwtPayload) {
    const user = await this.userService.getUserById(jwtPayload.sub);
    if (user) {
      //   const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload: jwtPayload = { sub: user.id };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async register(data: Prisma.UserEntityCreateInput) {
    const user = await this.userService.createUser(data);
    const payload: jwtPayload = { sub: user.id };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
