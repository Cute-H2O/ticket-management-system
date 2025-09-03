<template>
  <div class="ticket-table">
    <a-table :dataSource="tickets" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'overtime'">
          {{ record.overtime ? 'Yes' : 'No' }}
        </template>
        <template v-if="column.key === 'action' && authStore.isAdmin">
          <a-button type="link" danger @click="deleteTicket(record.id)">
            Delete
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();

// 模拟数据
const initialTickets = [
  {
    id: "001",
    project: "Road Project A",
    overtime: true,
    hours: 3.5,
    created_at: "2024-04-10 10:30"
  },
  {
    id: "002",
    project: "Bridge Maintenance B",
    overtime: false,
    hours: 2,
    created_at: "2024-04-09 13:00"
  },
  {
    id: "003",
    project: "Pipeline Fix C",
    overtime: true,
    hours: 4.5,
    created_at: "2024-04-08 08:00"
  },
  {
    id: "004",
    project: "Bridge Maintenance B",
    overtime: true,
    hours: 3,
    created_at: "2024-04-07 16:45"
  },
  {
    id: "005",
    project: "Tunnel Cleaning D",
    overtime: false,
    hours: 8.1,
    created_at: "2024-04-03 11:43"
  }
];

const tickets = ref([...initialTickets]);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
  },
  {
    title: 'Overtime',
    dataIndex: 'overtime',
    key: 'overtime',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const deleteTicket = (id) => {
  tickets.value = tickets.value.filter(ticket => ticket.id !== id);
  message.success('工单删除成功');
  
  // 触发自定义事件通知图表更新
  window.dispatchEvent(new CustomEvent('ticketsUpdated', { 
    detail: tickets.value 
  }));
};

// 计算属性用于图表数据
const chartData = computed(() => {
  const projectHours = {};
  
  tickets.value.forEach(ticket => {
    if (!projectHours[ticket.project]) {
      projectHours[ticket.project] = 0;
    }
    projectHours[ticket.project] += ticket.hours;
  });
  
  return {
    projects: Object.keys(projectHours),
    hours: Object.values(projectHours)
  };
});

// 暴露数据给父组件
defineExpose({
  chartData
});
</script>

<style scoped>
.ticket-table {
  margin-bottom: 24px;
}
</style>