import {
	Controller,
	Get,
	Post,
	Request,
	Response,
	UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LineAuthGuard } from './line.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}

  @UseGuards(LineAuthGuard)
  @Get('login/line')
  loginByLine(@Request() req) {}

  @UseGuards(LineAuthGuard)
  @Get('line/callback')
  async lineCallback(@Request() req, @Response() res) {
    if (!req.user) {
      return 'No user from line';
    }
    res.redirect('/');
  }

  @Post('logout')
  async logout(@Request() req): Promise<void> {
    req.session.destroy();
  }
}
