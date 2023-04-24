import * as moment from 'moment';
export const getExpiry = () => {
  const createdAt = new Date();
  const expiresAt = moment(createdAt).add(5, 'minutes').toDate();
  return expiresAt;
};
