import { NEW_FEED } from '../common/constants/new';

export const countNumber = (count?: number) => ({
  type: NEW_FEED.GET_NUMBER_NEW_FEED,
  payload: count
});

