import id from '@/messages/id.json';
import en from '@/messages/en.json';

export const messages = {
  id,
  en
};

export type Lang = keyof typeof messages;
