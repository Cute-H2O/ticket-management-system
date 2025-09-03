<template>
  <div class="hours-chart">
    <h2>Project Hours Distribution</h2>
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let chartInstance = null;

const updateChart = (tickets) => {
  if (!tickets) return;
  
  const projectHours = {};
  
  tickets.forEach(ticket => {
    if (!projectHours[ticket.project]) {
      projectHours[ticket.project] = 0;
    }
    projectHours[ticket.project] += ticket.hours;
  });
  
  const option = {
    title: {
      text: 'Project Hours Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: Object.keys(projectHours)
    },
    yAxis: {
      type: 'value',
      name: 'Hours'
    },
    series: [
      {
        name: 'Hours',
        type: 'bar',
        data: Object.values(projectHours),
        itemStyle: {
          color: '#1890ff'
        }
      }
    ]
  };
  
  if (chartInstance) {
    chartInstance.setOption(option);
  }
};

// 监听工单更新事件
const handleTicketsUpdated = (event) => {
  updateChart(event.detail);
};

onMounted(() => {
  chartInstance = echarts.init(chartRef.value);
  
  // 监听自定义事件
  window.addEventListener('ticketsUpdated', handleTicketsUpdated);
  
  // 初始化工单数据
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
  
  updateChart(initialTickets);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener('ticketsUpdated', handleTicketsUpdated);
});
</script>

<style scoped>
.hours-chart {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>