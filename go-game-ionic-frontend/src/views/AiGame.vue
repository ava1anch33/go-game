<template>
    <ion-page>
        <CustomHeader :title="$t('tabs.aiGame')" />

        <ion-content
            :fullscreen="true"
            class="ion-padding"
            style="--background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
            <div class="board-container">
                <div :class="{ 'cursor-disable': aiThinking || !isGaming }">
                    <BoardPixi
                        :callback="handleClick"
                        :loading="aiThinking"
                        :forbidden-click="aiThinking || !isGaming"
                    />
                </div>
            </div>

            <div class="settings-panel">
                <h2 class="panel-title">{{ $t('aiGame.gameSetting') }}</h2>

                <div class="form-item">
                    <ion-label position="stacked">{{ $t('aiGame.gameName') }}</ion-label>
                    <ion-input
                        v-if="!isGaming"
                        v-model="gameSettingForm.name"
                        :placeholder="$t('aiGame.gameNamePlaceholder')"
                        fill="outline"
                    ></ion-input>
                    <div v-else class="value">{{ gameSettingForm.name }}</div>
                </div>

                <div class="form-item">
                    <ion-label position="stacked">{{ $t('aiGame.aiFirst') }}</ion-label>
                    <ion-toggle
                        v-model="gameSettingForm.aiFirst"
                        aria-label="Tertiary toggle"
                        class="ai-first-toggle"
                        color="tertiary"
                        justify="space-between"
                    ></ion-toggle>
                </div>

                <div class="form-item">
                    <ion-label position="stacked">{{ $t('aiGame.aiStrength') }}</ion-label>
                    <ion-range
                        v-model="gameSettingForm.aiAttempts"
                        :min="5"
                        :max="1000"
                        :step="5"
                        snaps
                        ticks
                        color="primary"
                    ></ion-range>
                    <div class="slider-tip">
                        {{ $t('aiGame.currentAiAttempt', { attempt: gameSettingForm.aiAttempts }) }}
                    </div>
                </div>

                <div class="button-group">
                    <ion-button
                        expand="block"
                        color="primary"
                        :disabled="isGaming"
                        :loading="isGaming && !aiThinking"
                        @click="createNewGame"
                        class="action-btn"
                    >
                        {{ $t('aiGame.createGame') }}
                    </ion-button>

                    <ion-button
                        expand="block"
                        color="danger"
                        :disabled="!isGaming"
                        @click="endGame"
                        class="action-btn danger"
                    >
                        {{ $t('aiGame.endGame') }}
                    </ion-button>
                </div>

                <div class="status-tip" v-if="isGaming">
                    <ion-spinner v-if="aiThinking" name="crescent" color="primary"></ion-spinner>
                    <span v-if="aiThinking">
                        {{ $t('aiGame.aiThinking') }}
                    </span>
                    <span v-else>
                        {{ $t('aiGame.yourTurn') }}
                    </span>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonButton,
    IonSpinner,
    IonLabel,
    IonInput,
    IonRange,
    IonToggle,
} from '@ionic/vue'
import BoardPixi from '@/components/BoardPixi.vue'
import { useGameStore } from '@/stores'
import { apiEndGame } from '@/api'
import { reactive, ref, onMounted } from 'vue'
import CustomHeader from '@/components/ui/CustomHeader.vue'
import { useI18n } from 'vue-i18n'
import { showMessage } from '@/components/ui/modal'

const game = useGameStore()
const { t } = useI18n()

const isGaming = ref(false)
const aiThinking = ref(false)

const gameSettingForm = reactive({
    name: 'newGame',
    aiFirst: false,
    aiAttempts: 100,
})

const createNewGame = async () => {
    if (isGaming.value) return

    isGaming.value = true
    aiThinking.value = true

    try {
        await game.createNewGame(gameSettingForm.name, gameSettingForm.aiFirst)
    } catch (err) {
        await showMessage(t('errors.title'), t('errors.invalidCredentials'))
        isGaming.value = false
    } finally {
        aiThinking.value = false
    }
}

const handleClick = async (x: number, y: number) => {
    if (!isGaming.value || aiThinking.value) return

    const success = game.placeStone(x, y)
    if (!success) return

    aiThinking.value = true
    try {
        const aiSuccess = await game.getAiThinking(gameSettingForm.aiAttempts)
        if (aiSuccess === false) {
            await showMessage(t('aiGame.endGame'), t('aiGame.aiLose'))
            game.reset()
            isGaming.value = false
        }
    } catch (err) {
        console.error('AI 思考失敗', err)
    } finally {
        aiThinking.value = false
    }
}

const endGame = async () => {
    if (!isGaming.value) return

    const result = game.determineWhoIsWinner()

    await showMessage(t('aiGame.endGame'), result.result)

    apiEndGame(game.gameId!, game.board)

    isGaming.value = false
    game.reset()
}

onMounted(() => {
    game.reset()
})
</script>

<style scoped>
.board-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 100vw;
    max-height: 65vh;
    margin: 0 auto 24px auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    background: #fff;
}

.settings-panel {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px 20px 0 0;
    padding: 24px;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15);
    margin-top: auto;
}

.panel-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 24px 0;
    text-align: center;
    color: #333;
}

.form-item {
    margin-bottom: 24px;
}

.form-item ion-label {
    font-weight: 600;
    color: #555;
    margin-bottom: 8px;
}

.form-item .value {
    font-weight: 500;
    color: #111;
    padding: 12px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
}

.horizontal-radio {
    display: flex;
    gap: 32px;
    justify-content: center;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
}

.action-btn {
    --border-radius: 12px;
    height: 52px;
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: none;
}

.danger {
    --background: #ff4d4f;
}

.status-tip {
    margin-top: 24px;
    text-align: center;
    font-size: 1.1rem;
    color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.slider-tip {
    margin-top: 8px;
    font-size: 0.9rem;
    color: #666;
    text-align: center;
}

.cursor-disable {
    cursor: not-allowed;
    pointer-events: none;
}

.ai-first-toggle {
    margin-top: 15px;
}
</style>
