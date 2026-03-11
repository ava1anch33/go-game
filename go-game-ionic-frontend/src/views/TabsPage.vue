<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar
                slot="bottom"
                translucent
                style="
                    --background: linear-gradient(
                        135deg,
                        rgba(102, 126, 234, 0.35) 0%,
                        rgba(118, 75, 162, 0.35) 100%
                    );
                    --border: 0;
                    --color: rgba(255, 255, 255, 0.75);
                    --color-selected: #ffffff;
                    --color-focused: #ffffff;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
                "
            >
                <ion-tab-button
                    v-for="value in navLinks"
                    :key="value.name"
                    :tab="value.name"
                    :href="value.path"
                >
                    <ion-icon aria-hidden="true" :icon="value.icon" />
                    <ion-label>{{ value.name }}</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
} from '@ionic/vue'
import { analytics, cog, logoIonitron } from 'ionicons/icons'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const navLinks = computed(() => [
    { name: t('tabs.analysis'), path: '/go/analysis', icon: analytics },
    { name: t('tabs.aiGame'), path: '/go/ai-game', icon: logoIonitron },
    { name: t('tabs.settings'), path: '/go/setting', icon: cog },
])
</script>

<style scoped>
ion-tab-button.tab-selected {
    --color: #ffffff !important;
    --color-focused: #ffffff !important;
}

ion-tab-button ion-icon {
    font-size: 1.6rem;
    margin-bottom: 4px;
}

ion-tab-button ion-label {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.5px;
}

ion-tab-button::part(native) {
    --ripple-color: rgba(255, 255, 255, 0.4);
}
</style>
