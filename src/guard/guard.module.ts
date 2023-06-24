import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwtauth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [JwtAuthGuard],
    exports: [JwtAuthGuard],
})
export class GuardModule { }
