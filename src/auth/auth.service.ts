import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService) { }

    async login(username: string, password: string): Promise<string> {
        const user = await this.usersService.findByUser(username);
        console.log({ user });

        const isMatch = await this.comparePasswords(password, user.password);

        if (!user || !isMatch) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { userId: user.id };
        const token = this.jwtService.sign(payload);
        return token;
    }

    async comparePasswords(password: string, hashedPassword: string) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            if (isMatch) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log('Error', err);
        }
    }
}
