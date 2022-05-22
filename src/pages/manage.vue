/* eslint-disable no-unused-vars */
<template>
  <a-table
    :columns="state.columns"
    :data-source="state.dataSource"
    :loading="state.loading"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import GeoFenceService from '@/service/GeoFence';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const service = new GeoFenceService();
// eslint-disable-next-line no-unused-vars
const router = useRouter();

const state = reactive({
  columns: [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '类型',
      dataIndex: 'shape',
      customRender: ({ text: shape }) => (shape.radius ? '圆形' : '多边形'),
    },
  ],
  dataSource: [],
  loading: false,
});

const search = async () => {
  try {
    state.loading = true;
    const { results } = await service.list();
    state.dataSource = results;
  } finally {
    state.loading = false;
  }
};

onMounted(search);
</script>
