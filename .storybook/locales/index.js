import en from './en';
import ru from './ru';
import {
  en as qMessagesEn,
  ru as qMessagesRu
} from '../../src/qComponents/constants/locales';

export default {
  en: {
    ...en,
    ...qMessagesEn
  },
  ru: {
    ...ru,
    ...qMessagesRu
  }
};
