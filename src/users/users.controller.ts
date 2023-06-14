import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    return await this.usersService.createUser(username, password);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const user = await this.usersService.validateUser(username, password);
   
    return { access_token: await this.usersService.login(user) };
  }
}
