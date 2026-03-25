<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/CustomButton.vue'

const { t } = useI18n()
const auth = useAuthStore()
const user = computed(() => auth.user)

const form = reactive({
	firstName: '',
	lastName: '',
	phoneCode: '',
	phone: '',
})

onMounted(() => {
	if (!user.value) return
	Object.assign(form, user.value.profile || {})
})

const save = async () => {
	//   await auth.updateProfile({ profile: { ...form } })
}
</script>

<template>
	<div class="setting-bg">
		<div class="setting-panel">
			<section class="hud profile">
				<div class="avatar">
					<div class="stone white" />
				</div>

				<div class="identity">
					<div class="email">{{ user?.email }}</div>
					<div class="role">{{ user?.role.toUpperCase() }}</div>
				</div>
			</section>

			<section class="hud influence">
				<h3>{{ t('setting.title') }}</h3>

				<div class="grid">
					<input v-model="form.lastName" :placeholder="t('setting.lastName')" />
					<input v-model="form.firstName" :placeholder="t('setting.firstName')" />
					<input v-model="form.phoneCode" :placeholder="t('setting.phoneCode')" />
					<input v-model="form.phone" :placeholder="t('setting.phone')" />
				</div>

				<Button type="primary" @click="save">{{ t('setting.sync') }}</Button>
			</section>

			<!-- 安全 -->
			<section class="hud security">
				<h3>{{ t('setting.security') }}</h3>

				<div class="oauth">
					<span>{{ t('setting.google') }}</span>
					<i :class="user?.googleId ? 'stone white' : 'stone empty'" />
				</div>

				<div class="oauth">
					<span>{{ t('setting.github') }}</span>
					<i :class="user?.githubId ? 'stone white' : 'stone empty'" />
				</div>

				<Button type="secondary">{{ t('setting.changePassword') }}</Button>
			</section>

			<!-- 危险区 -->
			<section class="hud danger">
				<Button type="danger" @click="auth.logout">{{ t('setting.logout') }}</Button>
			</section>
		</div>
	</div>
</template>

<style scoped>
.setting-bg {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea, #764ba2);
	display: flex;
	justify-content: center;
	align-items: center;
}

.setting-panel {
	width: 720px;
	display: flex;
	flex-direction: column;
	gap: 24px;
}

/* HUD 卡片 */
.hud {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(14px);
	border-radius: 16px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 0 40px rgba(102, 126, 234, 0.3);
	color: #fff;
}

.profile {
	display: flex;
	align-items: center;
	gap: 16px;
}

.avatar {
	width: 72px;
	height: 72px;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
}

.identity .email {
	font-weight: bold;
}

.identity .role {
	opacity: 0.7;
	font-size: 12px;
}

/* Influence */
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12px;
	margin: 12px 0;
}

.grid input {
	background: rgba(0, 0, 0, 0.25);
	border: 1px solid rgba(255, 255, 255, 0.2);
	color: white;
	padding: 10px;
	border-radius: 8px;
}

/* 棋子 */
.stone {
	width: 20px;
	height: 20px;
	border-radius: 50%;
}
.stone.white {
	background: radial-gradient(circle, #fff, #ddd);
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}
.stone.empty {
	border: 1px dashed rgba(255, 255, 255, 0.4);
}

/* OAuth */
.oauth {
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
}

.danger {
	text-align: center;
}
</style>
