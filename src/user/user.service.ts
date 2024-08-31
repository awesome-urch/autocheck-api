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

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        console.log("create at user servicve", createUserDto);
        const { username, email, password } = createUserDto;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = this.userRepository.create({
          username,
          email,
          password: hashedPassword,
        });
    
        return this.userRepository.save(user);
    }

    // async findOne(username: string): Promise<User | undefined> {
    //     return this.userRepository.findOne({ where: { username: username } });
    // }

    // async findOne(username: string): Promise<User | undefined> {
    //     console.log("user at findOne", username);
    //     return this.userRepository.createQueryBuilder('user')
    //       .where('user.username = :username', { username })
    //       .getOne();
    //   }

    // src/user/user.service.ts
    async findOne(username: string): Promise<User | undefined> {
        console.log("user at findOne", username);
    
        const queryBuilder = this.userRepository.createQueryBuilder('user')
        .where('user.username = :username', { username });
    
        // Log the actual SQL query
        console.log('SQL Query:', queryBuilder.getSql());
    
        return queryBuilder.getOne();
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
