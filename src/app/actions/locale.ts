import axios from 'axios';

import { TranslatorContext } from 'react-jhipster';

export const setLocale = (locale: any) => async (dispatch: any) => {
  if (!Object.keys(TranslatorContext.context.translations).includes(locale)) {
    const response = await axios.get(`i18n/${locale}.json?buildTimestamp=${process.env.BUILD_TIMESTAMP}`, { baseURL: '' });
    TranslatorContext.registerTranslations(locale, response.data);
  }
  dispatch({
    type: 'locale/SET_LOCALE',
    locale
  });
};
