<template>
    <ion-page>
        <CustomHeader :title="$t('tabs.analysis')" show-back-button />

        <ion-content :fullscreen="true">
            <div class="avatar-section ion-text-center ion-padding">
                <div class="avatar-wrapper" @click="triggerFileInput">
                    <ion-avatar class="avatar">
                        <img :src="user.avatar || defaultAvatar" alt="avatar" />
                    </ion-avatar>
                    <ion-icon :icon="cameraOutline" class="camera-icon" />
                    <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        hidden
                        @change="handleAvatarUpload"
                    />
                </div>
                <p class="avatar-tip">{{ $t("settings.clickToChangeAvatar") }}</p>
            </div>

            <ion-list :inset="true" lines="full">
                <ion-item>
                    <ion-label position="stacked">{{ $t("settings.firstName") }}</ion-label>
                    <ion-input
                        v-model="user.firstName"
                        :placeholder="$t('settings.firstNamePlaceholder')"
                        clear-input
                        autocapitalize="words"
                    ></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t("settings.lastName") }}</ion-label>
                    <ion-input
                        v-model="user.lastName"
                        :placeholder="$t('settings.lastNamePlaceholder')"
                        clear-input
                        autocapitalize="words"
                    ></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t("settings.countryCode") }}</ion-label>
                    <ion-select
                        v-model="user.countryCode"
                        :placeholder="$t('settings.countryCodePlaceholder')"
                        interface="popover"
                    >
                        <ion-select-option
                            v-for="country in countries"
                            :key="country.code"
                            :value="country.code"
                        >
                            {{ country.label }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t("settings.phoneNumber") }}</ion-label>
                    <ion-input
                        v-model="user.phone"
                        type="tel"
                        :placeholder="$t('settings.phoneNumberPlaceholder')"
                        clear-input
                    ></ion-input>
                </ion-item>
            </ion-list>

            <div class="ion-padding">
                <ion-button expand="block" color="primary" @click="saveProfile" :disabled="saving">
                    <ion-spinner v-if="saving" name="crescent"></ion-spinner>
                    {{ saving ? $t('settings.saving') : $t('settings.save') }}
                </ion-button>
            </div>

            <div class="ion-padding">
                <ion-button expand="block" color="danger" fill="outline" @click="logout">
                    {{ $t('settings.logout') }}
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonAvatar,
    IonSpinner,
} from '@ionic/vue'
import { cameraOutline } from 'ionicons/icons'
import { ref, onMounted, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import CustomHeader from '@/components/ui/CustomHeader.vue'
import { showDialog } from '@/components/ui/dialog'
import { useI18n } from 'vue-i18n'

const auth = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const user = reactive({
    avatar: null as Base64URLString | null, 
    firstName: '',
    lastName: '',
    countryCode: '+852', 
    phone: '',
})

const countries = computed(() => [
    { code: '+86', label: t('settings.countryCodes.cn') },
    { code: '+81', label: t('settings.countryCodes.jp') },
    { code: '+82', label: t('settings.countryCodes.kr') },
    { code: '+852', label: t('settings.countryCodes.hk') },
    { code: '+853', label: t('settings.countryCodes.mo') },
    { code: '+886', label: t('settings.countryCodes.tw') },
    { code: '+1', label: t('settings.countryCodes.us') },
])

const defaultAvatar = 'https://ionicframework.com/docs/img/demos/avatar.svg'

const saving = ref(false)

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        user.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
    await auth.uploadAvatar(file)
}

// 保存個人資料
const saveProfile = async () => {
    saving.value = true

    try {
        // 這裡呼叫你的更新 API
        // await updateUserProfile(user.value)

        await showDialog({
            title: '成功',
            content: '個人資料已更新',
        })
    } catch (err) {
        await showDialog({
            title: '錯誤',
            content: '更新失敗，請稍後再試',
        })
    } finally {
        saving.value = false
    }
}

const logout = async () => {
    await auth.logout()
    router.replace('/login')
}

onMounted(() => {
    Object.assign(user, {
        avatar: auth.user?.profile.avatar || defaultAvatar,
        firstName: auth.user?.profile.firstName || '',
        lastName: auth.user?.profile.lastName || '',
        countryCode: auth.user?.profile.phoneCode || '+852',
        phone: auth.user?.profile.phone || '',
    })
})
</script>

<style scoped>
.avatar-section {
    margin: 32px 0 24px 0;
}

.avatar-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.camera-icon {
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-size: 32px;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 8px;
}

.avatar-tip {
    margin-top: 12px;
    color: var(--ion-color-medium);
    font-size: 0.9rem;
}

.settings-panel {
    background: var(--ion-color-light);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.form-item {
    margin-bottom: 24px;
}

.form-item ion-label {
    font-weight: 600;
    color: var(--ion-color-dark);
}

.value {
    padding: 12px;
    background: var(--ion-color-light-tint);
    border-radius: 8px;
    color: var(--ion-color-dark);
}

.button-group {
    margin-top: 32px;
}

.status-tip {
    margin-top: 24px;
    text-align: center;
    font-size: 1.1rem;
    color: var(--ion-color-primary);
}
</style>
