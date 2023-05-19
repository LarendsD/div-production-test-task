import { cookieExtractor } from '../extractor/session.extractor';
import { jwtConstants } from '../constants';

export default () => {
  return {
    jwtFromRequest: cookieExtractor,
    ignoreExpiration: false,
    secretOrKey: jwtConstants.secret,
  };
};
