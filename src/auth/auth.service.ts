// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AccessTokenService } from './access-token.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly accessTokenService: AccessTokenService,
  ) {}

//   async validateUser(username: string, pass: string): Promise<User | null> {
//     const user = await this.userService.findOne(username);
//     if (user && pass === 'password') { // Simplified validation
//       return user;
//     }
//     return null;
//   }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOne(username);
    if (user && await this.userService.validatePassword(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    console.log("user,", user);
    const getUser =  await this.userService.findOne(user.username);
    if (!getUser) {
        throw new Error('User not found');
      }
    console.log("user 2,", getUser);
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    await this.accessTokenService.createToken(getUser, token);
    return { access_token: token };
  }

  async validateToken(token: string): Promise<User | null> {
    const accessToken = await this.accessTokenService.findToken(token);
    return accessToken ? accessToken.user : null;
  }
}
