import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() authInfo: CreateUserDto) {
    return this.authService.createUser(authInfo);
  }

  @Post('/validate')
  loginUser(@Body() authInfo: LoginUserDto) {
    return this.authService.validateUser(authInfo);
  }

  
}
