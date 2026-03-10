<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>棋盘分析</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- 棋盘区域（占满大部分空间） -->
      <div class="board-container">
        <BoardPixi
          :forbidden-click="analyzing"
          :callback="clickBoard"
          :show-influence="true"
        />
      </div>

      <!-- 底部操作面板 -->
      <div class="settings-panel">
        <h3 class="panel-title">棋盘识别</h3>
        
        <ion-button
          expand="block"
          color="primary"
          :disabled="analyzing"
          @click="analystImage"
          class="action-btn"
        >
          <ion-spinner v-if="analyzing" name="crescent" slot="start"></ion-spinner>
          {{ analyzing ? '分析中...' : '开始分析' }}
        </ion-button>

        <!-- 可选：添加更多功能按钮 -->
        <!-- <ion-button expand="block" fill="outline" @click="resetBoard">重置棋盘</ion-button> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonButtons, IonBackButton } from '@ionic/vue';
import BoardPixi from '@/components/BoardPixi.vue';
import { useGameStore } from '@/stores';
import { ref, onMounted } from 'vue';

const game = useGameStore();
const analyzing = ref(false);

onMounted(() => {
  game.reset();
});

function clickBoard(x: number, y: number) {
  game.placeStone(x, y);
}

async function analystImage() {
  if (analyzing.value) return;
  
  analyzing.value = true;
  try {
    await game.analystImgGame();
  } catch (err) {
    console.error('分析失败:', err);
    // 可选：显示 Ionic toast 或 alert
  } finally {
    analyzing.value = false;
  }
}
</script>

<style scoped>
.board-container {
  width: 100%;
  aspect-ratio: 1 / 1;         
  max-width: 500px;
  margin: 0 auto 24px auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: #fff;
}

.settings-panel {
  background: var(--ion-color-light);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.panel-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--ion-color-dark);
}

.action-btn {
  --border-radius: 12px;
  height: 56px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin-top: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
}

/* 手机端适配：小屏幕时缩小间距 */
@media (max-width: 400px) {
  .board-container {
    max-width: 90vw;
  }
  .settings-panel {
    padding: 16px;
  }
}
</style>