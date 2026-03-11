import { createI18n } from 'vue-i18n'

import en from './en.json'
import hk from './hk.json'
import cn from './cn.json'
import ko from './ko.json'
import ja from './ja.json'

const SUPPORTED_LOCALES = ['cn', 'hk', 'en', 'ko', 'ja'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

const messages = {
    cn,
    hk,
    en,
    ko,
    ja,
}

const getBrowserLocale = (): Locale => {
    const browserLang = navigator.language || navigator.languages[0] || 'en'
    if (browserLang.startsWith('zh-CN') || browserLang === 'zh') return 'cn'
    if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) return 'hk'
    if (browserLang.startsWith('ko')) return 'ko'
    if (browserLang.startsWith('ja')) return 'ja'
    return 'en'
}

const getSavedLocale = () => {
    const saved = localStorage.getItem('preferredLanguage')
    return saved && SUPPORTED_LOCALES.includes(saved as Locale) ? (saved as Locale) : null
}

const initialLocale = getSavedLocale() || getBrowserLocale()

const i18n = createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages,
})

export function setLanguage(lang: Locale) {
    if (SUPPORTED_LOCALES.includes(lang)) {
        i18n.global.locale.value = lang
        localStorage.setItem('preferredLanguage', lang)
    }
}

export default i18n
