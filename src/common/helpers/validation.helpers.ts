import { URL_REGEX } from '@common/constants/regex.constants';

export const isValidURL = (url: string) => {
  const res = url.match(URL_REGEX);
  return res !== null;
};
