import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from 'src/authors/entities/author.entity';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDTO } from 'src/person/login.dto';


@Controller()

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @IsPublic()
    @ApiTags('auth')
    @ApiResponse({status: 200, description: 'Login efetuado com sucesso.'})
    @ApiBody( { type: LoginDTO})
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req:any){
        return this.authService.login(req.user)
    }
    
}
