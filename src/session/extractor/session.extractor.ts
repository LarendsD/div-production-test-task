export const cookieExtractor = (req) => {
  return req.cookies?.access_token;
};
