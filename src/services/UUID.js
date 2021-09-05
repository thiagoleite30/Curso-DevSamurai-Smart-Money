/* eslint-disable prettier/prettier */
import {v4 as uuidv4} from 'uuid';

export const getUUID = () => {
  const id = uuidv4();
  console.log('getUUID :: ID: ', id);
  return id;
};
