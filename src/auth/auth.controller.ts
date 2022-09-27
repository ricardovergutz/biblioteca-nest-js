import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from 'src/authors/entities/author.entity';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller()

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @IsPublic()
    @ApiTags('auth')
    @ApiResponse({status: 200, description: 'Login efetuado com sucesso.'})
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req:any){
        return this.authService.login(req.user)
    }
    
}
