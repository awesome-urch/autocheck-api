import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }
}
