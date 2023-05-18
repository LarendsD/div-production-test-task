export const generateFilename = () =>
  `${Date.now() + '-' + Math.round(Math.random() * 1e9)}.email`;
