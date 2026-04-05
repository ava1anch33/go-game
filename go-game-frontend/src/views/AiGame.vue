<script setup lang="ts">
import BoardPixi from '@/components/BoardPixi.vue'
import Button from '@/components/ui/CustomButton.vue'
import { useGameStore } from '@/stores'
import { Stone } from '@/types'
import Input from '@/components/ui/CustomInput.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import Radio from '@/components/ui/CustomRadio.vue'
import Slider from '@/components/ui/CustomSlider.vue'
import { showDialog } from '@/components/ui/dialog'
import { apiEndGame } from '@/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const game = useGameStore()

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
		console.error('创建游戏失败', err)
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
			await showDialog({
				title: t('game.gameOver'),
				content: t('game.aiSurrender'),
			})
			game.reset()
		}
	} finally {
		aiThinking.value = false
	}
}

const endGame = async () => {
	if (!isGaming.value) return
	const result = game.determineWhoIsWinner()

	await showDialog({
		title: t('game.judge'),
		content: result.result,
	})

	apiEndGame(game.gameId!, game.board)

	isGaming.value = false
	game.reset()
}

onMounted(() => {
	game.reset()
})
</script>

<template>
	<div class="game-layout">
		<div
			:class="{
				'cursor-disable': aiThinking || !isGaming,
			}"
		>
			<BoardPixi :callback="handleClick" :loading="aiThinking" />
		</div>

		<div class="settings-panel">
			<h2>{{ t('game.title') }}</h2>

			<div class="form-item">
				<label>{{ t('game.gameName') }}</label>
				<Input v-if="!isGaming" v-model="gameSettingForm.name" />
				<div v-else class="value">{{ gameSettingForm.name }}</div>
			</div>

			<div class="form-item">
				<label>{{ t('game.aiFirst') }}</label>
				<RadioGroup
					v-model="gameSettingForm.aiFirst"
					direction="horizontal"
					:disabled="isGaming"
				>
					<Radio :value="true">{{ t('game.yes') }}</Radio>
					<Radio :value="false">{{ t('game.no') }}</Radio>
				</RadioGroup>
			</div>

			<div class="form-item">
				<label>{{ t('game.aiAttempts') }}</label>
				<Slider v-model="gameSettingForm.aiAttempts" :min="5" :max="1000" :step="5" />
				<div class="slider-tip">
					{{ t('game.simulations') }}: {{ gameSettingForm.aiAttempts }}
				</div>
			</div>

			<!-- 操作按钮 -->
			<div class="button-group">
				<Button
					type="primary"
					:loading="isGaming && !aiThinking"
					@click="createNewGame"
					:disabled="isGaming"
				>
					{{ t('game.createGame') }}
				</Button>

				<Button type="danger" @click="endGame" :disabled="!isGaming">
					{{ t('game.endGame') }}
				</Button>
			</div>

			<!-- 当前状态提示 -->
			<div class="status-tip" v-if="isGaming">
				<span v-if="aiThinking">{{ t('game.aiThinking') }}</span>
				<span v-else
					>{{ t('game.yourTurn') }}
					{{
						game.currentPlayer === Stone.Black ? t('game.youBlack') : t('game.youWhite')
					}}
					{{ t('game.place') }}</span
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
.game-layout {
	display: flex;
	justify-content: space-between;
	padding: 24px;
	gap: 24px;
}

.cursor-disable {
	cursor: not-allowed;
}

.settings-panel {
	width: 360px;
	background: rgba(255, 255, 255, 0.95);
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	overflow-y: auto;
	position: relative;
	z-index: 1;
}

h2 {
	margin: 0 0 24px;
	font-size: 1.5rem;
	color: #333;
}

.form-item {
	margin-bottom: 24px;
}

.form-item label {
	display: block;
	margin-bottom: 8px;
	font-weight: 800;
	color: #555;
}

.form-item .value {
	display: block;
	font-weight: 500;
	color: #111111;
}

.button-group {
	display: flex;
	gap: 16px;
	margin-top: 32px;
}

.status-tip {
	margin-top: 24px;
	text-align: center;
	font-size: 1.1rem;
	color: #409eff;
}

.slider-tip {
	margin-top: 8px;
	font-size: 0.9rem;
	color: #666;
	text-align: center;
}
</style>
