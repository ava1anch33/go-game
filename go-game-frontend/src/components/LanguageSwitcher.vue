<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isOpen = ref(false)

const languages = [
  { code: 'cn', name: '简体中文', flag: 'CN' },
  { code: 'hk', name: '繁體中文', flag: 'HK' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'ja', name: '日本語', flag: 'JP' },
  { code: 'ko', name: '한국어', flag: 'KR' },
]

const currentLang = computed(() => {
  return languages.find(l => l.code === locale.value) || languages[0]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (code: string) => {
  locale.value = code
  localStorage.setItem('locale', code)
  isOpen.value = false
}

const closeDropdown = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="language-switcher" v-click-outside="closeDropdown">
    <button class="lang-trigger" @click="toggleDropdown" :title="$t('header.language')">
      <svg class="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span class="lang-code">{{ currentLang.flag }}</span>
      <svg class="chevron" :class="{ open: isOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="dropdown-item"
          :class="{ active: lang.code === locale }"
          @click="selectLanguage(lang.code)"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span class="lang-name">{{ lang.name }}</span>
          <svg v-if="lang.code === locale" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.language-switcher {
  position: relative;
  z-index: 1001;
}

.lang-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: rgba(240, 240, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.lang-trigger:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(167, 139, 250, 0.5);
}

.globe-icon {
  width: 18px;
  height: 18px;
}

.lang-code {
  font-weight: 600;
  font-size: 0.85rem;
}

.chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

.chevron.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: rgba(30, 30, 60, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(180, 160, 255, 0.2);
  border-radius: 10px;
  padding: 6px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: 6px;
  color: rgba(240, 240, 255, 0.9);
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(120, 100, 220, 0.3);
}

.dropdown-item.active {
  background: rgba(124, 58, 237, 0.3);
  color: white;
}

.lang-flag {
  font-weight: 600;
  font-size: 0.85rem;
  min-width: 24px;
}

.lang-name {
  flex: 1;
  font-size: 0.9rem;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #a78bfa;
}

/* 过渡动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
