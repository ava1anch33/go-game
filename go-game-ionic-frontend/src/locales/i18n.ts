import { createI18n } from "vue-i18n";

import en from "./en.json";
import hk from "./hk.json";
import cn from "./cn.json";
import ko from "./ko.json";
import ja from "./ja.json";

const messages = {
    cn,
    hk,
    en,
    ko,
    ja
};

const i18n = createI18n({
    locale: 'cn',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
