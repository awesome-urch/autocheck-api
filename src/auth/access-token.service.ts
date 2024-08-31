import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from '../entities/access-token.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createToken(user: User, token: string): Promise<AccessToken> {
    const accessToken = new AccessToken();
    accessToken.user = user;
    accessToken.token = token;
    return this.accessTokenRepository.save(accessToken);
  }

  async findToken(token: string): Promise<AccessToken | undefined> {
    return this.accessTokenRepository.findOne({ where: { token }, relations: ['user'] });
  }
}
