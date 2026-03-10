<template>
    <ion-page>
        <custom-header :title="$t('login.title')"></custom-header>

        <ion-content 
            :fullscreen="true" 
            class="go-login-content" 
            :scroll-y="false"
        >
            <div class="bg-gradient"></div>
            <div class="bg-orb orb-1"></div>
            <div class="bg-orb orb-2"></div>

            <div class="center-container">
                <div class="glass-card ion-padding">
                <div class="grid-line line-h"></div>
                <div class="grid-line line-v"></div>

                <div class="stone stone-black"></div>
                <div class="stone stone-white"></div>

                <div class="header ion-text-center">
                    <h1 class="title">{{ $t('login.title') }}</h1>
                    <p class="subtitle">{{ isLogin ? $t('login.backToGame') : $t('login.newToGame') }}</p>
                </div>

                <form @submit.prevent="handleSubmit" class="form-body">
                    <ion-item lines="full" class="input-item">
                    <ion-label label-placement="floating">{{ $t('login.email') }}</ion-label>
                    <ion-input
                        v-model="formData.email"
                        type="email"
                        autocomplete="email"
                        required
                    ></ion-input>
                    </ion-item>

                    <ion-item lines="full" class="input-item">
                    <ion-label label-placement="floating">{{ $t('login.password') }}</ion-label>
                    <ion-input
                        v-model="formData.password"
                        type="password"
                        autocomplete="current-password"
                        required
                    ></ion-input>
                    </ion-item>

                    <transition name="fade-slide">
                    <ion-item v-if="!isLogin" lines="full" class="input-item">
                        <ion-label label-placement="floating">{{ $t('login.confirmPassword') }}</ion-label>
                        <ion-input
                        v-model="formData.confirmPassword"
                        type="password"
                        autocomplete="new-password"
                        required
                        ></ion-input>
                    </ion-item>
                    </transition>

                    <div class="actions ion-margin-top">
                    <ion-button expand="block" type="submit" class="btn-main" shape="round">
                        {{ isLogin ? $t('login.submit') : $t('login.submit') }}
                    </ion-button>
                    </div>
                </form>

                <div class="footer ion-text-center ion-margin-top">
                    <span>{{ isLogin ? $t('login.noAccount') : '已有帳號？' }}</span>
                    <a href="#" @click.prevent="toggleMode" class="toggle-link">
                    {{ isLogin ? $t('login.registerNow') : '前往登入' }}
                    </a>
                </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { showDialog } from '@/components/ui/dialog';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import CustomHeader from '@/components/ui/CustomHeader.vue';

const auth = useAuthStore();
const router = useRouter();

const isLogin = ref(true);

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  formData.password = '';
  formData.confirmPassword = '';
};

const handleSubmit = async () => {
  if (!isLogin.value && formData.password !== formData.confirmPassword) {
    await showDialog({
      title: '錯誤',
      content: '兩次輸入的密碼不一致',
    });
    return;
  }

  try {
    if (isLogin.value) {
      await auth.login(formData.email, formData.password);
    } else {
      await auth.register(formData.email, formData.password);
    }
    router.replace({ name: 'AiGame' });
  } catch (error: any) {
    await showDialog({
      title: '錯誤',
      content: error.message || '登入/註冊失敗，請重試',
    });
  }
};
</script>

<style scoped>
.go-login-content {
  --background: none;
  position: relative;
  overflow: hidden;
  display: flex;                
  justify-content: center;      
  align-items: center;         
  height: 100%;          
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -2;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 12s infinite ease-in-out;
  opacity: 0.6;
}

.bg-gradient,
.bg-orb {
  position: absolute;
  z-index: -2;
}
.orb-1 {
  width: 320px;
  height: 320px;
  background: rgba(255, 255, 255, 0.15);
  top: -80px;
  left: -80px;
}
.orb-2 {
  width: 280px;
  height: 280px;
  background: rgba(0, 0, 0, 0.25);
  bottom: 10%;
  right: 10%;
  animation-delay: -6s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 40px); }
}

.center-container {
  width: 100%;
  max-width: 420px;            
  padding: 20px;                
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.glass-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  color: white;
  width: 100%;                  
  max-width: 380px;             
  margin: 0 auto;              
}

.grid-line {
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  z-index: -1;
}
.line-h { width: 100%; height: 1px; top: 30%; left: 0; }
.line-v { height: 100%; width: 1px; left: 70%; top: 0; }

.stone {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.5);
}
.stone-black {
  background: radial-gradient(circle at 35% 35%, #555, #111);
  top: -22px;
  right: -22px;
}
.stone-white {
  background: radial-gradient(circle at 35% 35%, #fff, #ccc);
  bottom: -22px;
  left: -22px;
}

.title {
  font-size: 2.4rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  margin: 0;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
}
.subtitle {
  font-size: 1rem;
  opacity: 0.75;
  margin-top: 8px;
}

.input-item {
  --background: rgba(0, 0, 0, 0.2);
  --border-color: rgba(255, 255, 255, 0.3);
  --color: white;
  --placeholder-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
}
.input-item ion-label {
  color: rgba(255, 255, 255, 0.9);
}

.btn-main {
  --background: white;
  --color: #667eea;
  --border-radius: 50px;
  font-weight: bold;
  letter-spacing: 2px;
  height: 56px;
  font-size: 1.1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}
.btn-main:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.toggle-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.6);
}
.toggle-link:hover {
  border-bottom-style: solid;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

lang-select {
  --padding-start: 8px;
  --padding-end: 8px;
  --placeholder-color: white;
  --placeholder-opacity: 0.8;
  color: white;
  font-size: 0.95rem;
  max-width: 140px;
}

.lang-select::part(placeholder) {
  color: white;
}

.lang-select::part(text) {
  color: white;
}
</style>