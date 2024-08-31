import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, password } = createUserDto;
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = this.userRepository.create({
          username,
          email,
          password: hashedPassword,
        });
    
        return this.userRepository.save(user);
      }
}
