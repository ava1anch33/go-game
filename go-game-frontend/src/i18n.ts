import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import hk from './locales/hk.json'
import cn from './locales/cn.json'
import ko from './locales/ko.json'
import ja from './locales/ja.json'

const messages = {
	cn,
	hk,
	en,
	ko,
	ja,
}

const i18n = createI18n({
	locale: 'cn',
	fallbackLocale: 'en',
	messages,
})

export default i18n
