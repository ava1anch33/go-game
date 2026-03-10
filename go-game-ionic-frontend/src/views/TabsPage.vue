<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
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
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { analytics, cog, logoIonitron } from 'ionicons/icons';

const navLinks = [
  { name: '分析', path: '/go/analysis', icon: analytics },
  { name: '对弈', path: '/go/ai-game', icon: logoIonitron },
  { name: '设置', path: '/go/setting', icon: cog },
];

</script>
