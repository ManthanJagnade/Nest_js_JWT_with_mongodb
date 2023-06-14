import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body('username') username: string, @Body('password') password: string): Promise<any> {
    await this.usersService.createUser(username, password);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return { access_token: await this.usersService.login(user) };
  }
}
