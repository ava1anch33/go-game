<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/CustomButton.vue'
import { showDialog } from '@/components/ui/dialog'

const { t } = useI18n()
const auth = useAuthStore()
const user = computed(() => auth.user)
const fileUploadRef = ref<HTMLInputElement | null>(null)
const defaultAvatar = 'https://ionicframework.com/docs/img/demos/avatar.svg'
const avatar = ref(user.value?.avatar || defaultAvatar)

const form = reactive({
	firstName: user.value?.firstName || '',
	lastName: user.value?.lastName || '',
	phoneCode: user.value?.phoneCode || '',
	phone: user.value?.phone || '',
})

const pwdForm = reactive({
	currentPassword: '',
	newPassword: '',
	confirmNewPassword: '',
})

watch(
	() => auth.user,
	(newUser) => {
		avatar.value = newUser?.avatar || defaultAvatar
		Object.assign(form, newUser || {})
	}
)

const handleAvatarUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        avatar.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
    await auth.uploadAvatar(file)
}

const save = async () => {
	await auth.modifyUserProfile({
		firstName: form.firstName,
		lastName: form.lastName,
		phoneCode: form.phoneCode,
		phone: form.phone,
	})

	await showDialog({
		title: t('dialog.successTitle'),
		content: t('dialog.updateSuccess'),
	})
}

const updatePassword = async () => {
	try {
		if (pwdForm.newPassword !== pwdForm.confirmNewPassword) {
			showDialog({
				title: t('dialog.errorTitle'),
				content: t('setting.infoMisMatch'),
			})
			return
		}
		await auth.updatePassword({
			currentPassword: pwdForm.currentPassword,
			newPassword: pwdForm.newPassword,
		})
		showDialog({
			title: t('dialog.successTitle'),
			content: t('setting.updateSuccess'),
		})
	} catch (error) {
		showDialog({
			title: t('dialog.errorTitle'),
			content: (error as Error).message || t('setting.updateFailed'),
		})
	}
}
</script>

<template>
	<div class="setting-bg">
		<div class="setting-panel">
			<section class="hud profile">
				<div class="avatar">
					<input 
						ref="fileUploadRef" 
						type="file"
                        accept="image/*"
                        hidden
						@change="handleAvatarUpload"
					>
					<img
						class="user-avatar"
						:src="avatar" 
						alt="avatar" 
						@click="fileUploadRef?.click()"
					/>
				</div>

				<div class="identity">
					<div class="email">{{ user?.email }}</div>
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
				<Button type="primary" @click="save">{{ t('setting.syncPersonalInfo') }}</Button>
			</section>

			<section class="hud security">
				<h3>{{ t('setting.security') }}</h3>
				<div class="grid">
					<input v-model="pwdForm.currentPassword" :placeholder="t('setting.currentPassword')" />
					<input v-model="pwdForm.newPassword" :placeholder="t('setting.newPassword')" />
					<input v-model="pwdForm.confirmNewPassword" :placeholder="t('setting.confirmNewPassword')" />
				</div>
				<Button type="secondary" @click="updatePassword">{{ t('setting.changePassword') }}</Button>
			</section>

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

.user-avatar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid rgba(255, 255, 255, 0.2);
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
