<template>
    <ion-page>
        <CustomHeader :title="$t('tabs.analysis')" show-back-button />

        <ion-content
            class="ion-no-padding"
            style="--background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
            <div class="board-wrapper">
                <BoardPixi
                    :forbidden-click="analyzing"
                    :callback="clickBoard"
                    :show-influence="true"
                />
            </div>

            <div class="settings-panel">
                <h3 class="panel-title">{{ $t('analysis.recognize') }}</h3>

                <ion-button
                    expand="block"
                    fill="solid"
                    color="primary"
                    size="large"
                    :disabled="analyzing"
                    @click="analystImage"
                    class="action-btn"
                >
                    <ion-spinner v-if="analyzing" name="crescent" slot="start"></ion-spinner>
                    {{ analyzing ? $t('analysis.analyzing') : $t('analysis.start') }}
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonSpinner } from '@ionic/vue'
import BoardPixi from '@/components/BoardPixi.vue'
import { useGameStore } from '@/stores'
import { ref, onMounted } from 'vue'
import CustomHeader from '@/components/ui/CustomHeader.vue'

const game = useGameStore()
const analyzing = ref(false)

onMounted(() => {
    game.reset()
})

function clickBoard(x: number, y: number) {
    game.placeStone(x, y)
}

async function analystImage() {
    if (analyzing.value) return

    analyzing.value = true
    try {
        await game.analystImgGame()
    } catch (err) {
        console.error('分析失败:', err)
        // 可选：显示 Ionic toast 提示
        // const toast = await toastController.create({ message: '分析失败', duration: 2000 });
        // await toast.present();
    } finally {
        analyzing.value = false
    }
}
</script>

<style scoped>
.board-wrapper {
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 100vw;
    max-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.settings-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px 24px 34px 24px;
    box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.panel-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 16px 0;
    text-align: center;
    color: #333;
}

.action-btn {
    --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --border-radius: 12px;
    --color: white;
    height: 52px;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: none;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35);
    transition: all 0.3s;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.45);
}

.action-btn:disabled {
    --background: linear-gradient(135deg, #667eea80 0%, #764ba280 100%);
    opacity: 0.6;
}
</style>
