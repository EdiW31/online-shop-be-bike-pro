import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto){
    //returnam ce returneaza metoda signup din AuthService
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto, @Req() req, @Res() res){
    //returnam ce returneaza metoda signin din AuthService
    return this.authService.signin(dto, req, res);
  }

  @Get('logout')
  logout(@Req() req, @Res() res){
    // returnam ce returneaza metoda logout din AuthService
    return this.authService.logout(req, res);
  }
}
