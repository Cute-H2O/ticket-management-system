<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">工单管理系统</div>
      <a-button type="text" @click="logout" class="logout-btn">
        退出登录
      </a-button>
    </a-layout-header>
    <a-layout-content class="content">
      <TicketTable />
      <HoursChart />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import TicketTable from './TicketTable.vue';
import HoursChart from './HoursChart.vue';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
}

.logo {
  font-size: 18px;
  font-weight: bold;
}

.logout-btn {
  color: #1890ff;
}

.content {
  padding: 24px;
  background-color: #fff;
  margin: 24px;
  border-radius: 6px;
}
</style>