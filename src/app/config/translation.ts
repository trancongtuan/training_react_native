import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from '../actions/locale';

TranslatorContext.setDefaultLocale('vi');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  // th: { name: 'ไทย' },
  vi: { name: 'Tiếng Việt' }
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export const registerLocale = (store: any) => {
  store.dispatch(setLocale(Storage.session.get('locale', 'vi')));
};
