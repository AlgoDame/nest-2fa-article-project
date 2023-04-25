import * as moment from 'moment';
export const getExpiry = () => {
  const createdAt = new Date();
  const expiresAt = moment(createdAt).add(5, 'minutes').toDate();
  return expiresAt;
};

export function isTokenExpired(expiry: Date): boolean {
  const expirationDate = new Date(expiry);
  const currentDate = new Date();
  return expirationDate.getTime() <= currentDate.getTime();
}
