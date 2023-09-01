import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(registerDto: RegisterDto) {
    const registeredUser = await this.usersService.createUser(registerDto);

    return { id: registeredUser.id, email: registeredUser.email };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (user && isCorrectPassword) {
      return { id: user.id, email: user.email };
    }

    return null;
  }
}
