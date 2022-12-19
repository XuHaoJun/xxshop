import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as _ from 'lodash';
import { Strategy } from 'passport-line-auth';
import { LineProfile } from 'src/interfaces/line.interface';
import { AuthService } from './auth.service';

@Injectable()
export class LineStrategy extends PassportStrategy(Strategy) {
  constructor(private authSvc: AuthService, private configSvc: ConfigService) {
    super({
      channelID: configSvc.get('LINE_LOGIN_CHANNEL_ID'),
      channelSecret: configSvc.get('LINE_LOGIN_CHANNEL_SECRET'),
      callbackURL: configSvc.get('LINE_LOGIN_CALLBACK_URL'),
      scope: ['profile', 'openid', 'email'],
      botPrompt: 'normal',
      prompt: 'consent',
      uiLocales: 'zh-TW',
    });
  }

  async validate(accessToken, refreshToken, params, profile, cb): Promise<any> {
    const lineProfile: LineProfile = {
      id: params.id,
      displayName: params.displayName,
      avatarUrl: params.pictureUrl,
    };
    const user = await this.authSvc.validateLine(lineProfile);
    if (!user) {
      throw new UnauthorizedException();
    }
    return _.pick(user, ['id']);
  }
}
