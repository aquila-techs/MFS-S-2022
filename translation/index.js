import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
import en from './en';
import nl from './dutch';

I18n.fallbacks = true;

I18n.translations = {
  en,
  nl,
};

I18n.defaultLocale = 'nl';

export default I18n;
