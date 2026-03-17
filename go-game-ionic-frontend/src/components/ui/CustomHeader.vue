<template>
    <ion-header>
        <ion-toolbar
            style="
                --background: linear-gradient(
                    135deg,
                    rgba(102, 126, 234, 0.4) 0%,
                    rgba(118, 75, 162, 0.4) 100%
                );
                --border-color: transparent;
            "
        >
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="end">
                <ion-select
                    @ionChange="setLanguage($event.detail.value)"
                    :toggle-icon="earthSharp"
                    interface="popover"
                    :value="locale"
                >
                    <ion-select-option value="cn">简</ion-select-option>
                    <ion-select-option value="hk">繁</ion-select-option>
                    <ion-select-option value="ko">한국어</ion-select-option>
                    <ion-select-option value="ja">日本語</ion-select-option>
                    <ion-select-option value="en">EN</ion-select-option>
                </ion-select>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<script setup lang="ts">
import { setLanguage } from '@/locales'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonSelect, IonSelectOption } from '@ionic/vue'
import { earthSharp } from 'ionicons/icons'
import { useI18n } from 'vue-i18n'

defineProps<{
    title: string
}>()

const { locale } = useI18n()
</script>
