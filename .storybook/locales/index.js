import en from './en';
import ru from './ru';
import {
  en as QMessagesEn,
  ru as QMessagesRu
} from '../../src/qComponents/constants/locales';

export default {
  en: {
    ...en,
    ...QMessagesEn
  },
  ru: {
    ...ru,
    ...QMessagesRu
  }
};
