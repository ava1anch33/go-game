<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p class="message-content">{{ content }}</p>

      <div class="ion-text-center ion-margin-top">
        <ion-button color="primary" expand="block" @click="dismiss">
          {{ $t('common.confirm') || '確定' }}
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { modalController } from '@ionic/vue'

defineProps<{
  title: string
  content: string
}>()

const dismiss = () => {
  modalController.dismiss(null, 'confirm')
}
</script>

<style scoped>
.message-content {
  font-size: 1.1rem;
  white-space: pre-wrap;
  line-height: 1.5;
  margin: 1rem 0;
  text-align: center;
  color: #333;
}
</style>