<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const defaultAvatar = 'https://ionicframework.com/docs/img/demos/avatar.svg'

const objectUrl = ref<string | null>(null)
const showUserMenu = ref(false)

// Sidebar state: auto-collapsed by default
const sidebarCollapsed = ref(true)

// Auto expand/collapse on mouse hover
const handleSidebarMouseEnter = () => {
	if (window.innerWidth >= 900) {
		sidebarCollapsed.value = false
	}
}
const handleSidebarMouseLeave = () => {
	if (window.innerWidth >= 900) {
		sidebarCollapsed.value = true
	}
}

const navLinks = computed(() => [
	{ route: '/go/ai-game', label: t('nav.aiGame'), icon: '🤖' },
	{ route: '/go/analysis', label: t('nav.analysis'), icon: '📊' },
	{ route: '/go/setting', label: t('nav.setting'), icon: '⚙️' },
])

const isActive = (linkRoute: string) => {
	return route.path === linkRoute || route.path.startsWith(linkRoute + '/')
}

const currentPageTitle = computed(() => {
	const found = navLinks.value.find((n) => isActive(n.route))
	return found ? found.label : t('home.title')
})

const toggleUserMenu = () => {
	showUserMenu.value = !showUserMenu.value
}
const closeUserMenu = () => {
	showUserMenu.value = false
}

const goToSetting = () => {
	router.push('/go/setting')
	closeUserMenu()
}

const handleLogout = async () => {
	closeUserMenu()
	await auth.logout()
	router.push('/login')
}

const updateResponsive = () => {
	if (window.innerWidth < 900) {
		sidebarCollapsed.value = true
	}
}

onBeforeMount(async () => {
	auth.syncTokenWithStore()
	if (!auth.hasToken()) {
		router.replace('/login')
	} else if (!auth.user) {
		await auth.getUserDetail()
	}
})

onMounted(() => {
	updateResponsive()
	window.addEventListener('resize', updateResponsive)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateResponsive)
})
</script>

<template>
	<div class="home-page">
		<!-- Sidebar: auto expand on mouse hover -->
		<aside
			class="sidebar"
			:class="{ collapsed: sidebarCollapsed }"
			@mouseenter="handleSidebarMouseEnter"
			@mouseleave="handleSidebarMouseLeave"
		>
			<div class="logo">
				<span class="logo-icon">⚫⚪</span>
				<h1 v-show="!sidebarCollapsed">{{ $t('home.title') }}</h1>
			</div>

			<nav class="nav-menu">
				<ul>
					<li v-for="item in navLinks" :key="item.route">
						<router-link
							:to="item.route"
							:class="['nav-item', { active: isActive(item.route) }]"
						>
							<span class="icon">{{ item.icon }}</span>
							<span v-show="!sidebarCollapsed">{{ item.label }}</span>
						</router-link>
					</li>
				</ul>
			</nav>
		</aside>

		<!-- Main content -->
		<main class="main-content">
			<header class="header">
				<h2>{{ currentPageTitle }}</h2>

				<div class="user-area">
					<LanguageSwitcher />

					<div class="user-profile" v-click-outside="closeUserMenu">
						<div class="avatar-wrapper" @click="toggleUserMenu">
							<img
								class="user-avatar"
								:src="(auth.user?.avatar) || defaultAvatar" 
								alt="avatar" 
							/>
						</div>

						<span class="welcome" @click="toggleUserMenu">
							{{ $t('home.welcome') }}{{ auth.user?.lastName || 'Client' }}
						</span>

						<!-- User dropdown menu with i18n logout text -->
						<div class="user-dropdown" v-if="showUserMenu">
							<div class="dropdown-item" @click="goToSetting">
								<span>⚙️</span>
								<span>{{ $t('nav.setting') }}</span>
							</div>
							<div class="dropdown-item danger" @click="handleLogout">
								<span>🚪</span>
								<span>{{ $t('auth.logout') }}</span>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div class="content">
				<router-view />
			</div>
		</main>
	</div>
</template>

<style scoped>
.home-page {
	height: 100vh;
	display: flex;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: #9f9cca;
	overflow: hidden;
}

/* Sidebar: auto-collapsed + expand on hover */
.sidebar {
	width: 260px;
	flex-shrink: 0;
	background: rgba(30, 30, 60, 0.72);
	backdrop-filter: blur(12px);
	border-right: 1px solid rgba(255, 255, 255, 0.08);
	display: flex;
	flex-direction: column;
	padding: 24px 16px;
	transition:
		width 0.3s ease,
		padding 0.3s ease;
	z-index: 100;
}
.sidebar.collapsed {
	width: 70px;
	padding: 24px 8px;
}

.logo {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 48px;
}
.sidebar.collapsed .logo {
	justify-content: center;
}
.logo-icon {
	font-size: 2rem;
}
.logo h1 {
	font-size: 1.5rem;
	background: linear-gradient(90deg, #c4b5fd, #a78bfa);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin: 0;
}

.nav-menu ul {
	list-style: none;
	padding: 0;
	margin: 0;
}
.nav-item {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 14px 16px;
	border-radius: 10px;
	color: rgba(240, 240, 255, 0.95);
	text-decoration: none;
	transition: all 0.2s;
}
.sidebar.collapsed .nav-item {
	justify-content: center;
	padding: 14px 8px;
}
.nav-item:hover {
	background: rgba(120, 100, 220, 0.2);
	color: #fff;
}
.nav-item.active {
	background: rgba(120, 100, 220, 0.35);
	color: #fff;
}

/* Main content */
.main-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.header {
	height: 72px;
	background: rgba(20, 20, 50, 0.78);
	backdrop-filter: blur(16px);
	border-bottom: 1px solid rgba(180, 160, 255, 0.12);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32px;
	position: relative;
	z-index: 99;
}
.header h2 {
	margin: 0;
	font-size: 1.4rem;
}

.user-area {
	display: flex;
	align-items: center;
	gap: 16px;
}
.user-profile {
	display: flex;
	align-items: center;
	gap: 12px;
	position: relative;
	cursor: pointer;
}
.avatar-wrapper {
	width: 40px;
	height: 40px;
}
.user-avatar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid rgba(255, 255, 255, 0.2);
}
.welcome {
	font-size: 0.95rem;
	opacity: 0.9;
}

/* Dropdown menu: always on top */
.user-dropdown {
	position: absolute;
	top: 50px;
	right: 0;
	width: 170px;
	background: rgba(30, 30, 60, 0.92);
	backdrop-filter: blur(10px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	z-index: 9999 !important;
	overflow: hidden;
}
.dropdown-item {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 16px;
	color: #eee;
	font-size: 0.95rem;
}
.dropdown-item:hover {
	background: rgba(120, 110, 200, 0.25);
}
.dropdown-item.danger {
	color: #ff6b6b;
}

.content {
	flex: 1;
	overflow-y: auto;
	padding: 20px;
}
</style>
