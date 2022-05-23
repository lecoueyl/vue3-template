<template>
  <div>
    <a-dropdown>
      <template #overlay>
        <a-menu>
          <a-menu-item key="circle">
            圆形围栏
          </a-menu-item>
          <a-menu-item key="polygon">
            多边形围栏
          </a-menu-item>
        </a-menu>
      </template>
      <a-button type="primary">
        新建围栏
        <DownOutlined />
      </a-button>
    </a-dropdown>
    <a-button
      danger
      :disabled="!state.selectedRowKeys.length"
    >
      删除
    </a-button>
    <a-table
      :columns="state.columns"
      :data-source="state.dataSource"
      :loading="state.loading"
      :row-selection="rowSelection"
      :pagination="false"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>action</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import GeoFenceService from '@/service/GeoFence';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';
import { FENCE_SHAPE_POLYGON, FENCE_SHAPE_CIRCLE } from '@/constants/index';

const service = new GeoFenceService();
const router = useRouter();

const state = reactive({
  columns: [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      customRender: ({ text }) => (text === FENCE_SHAPE_CIRCLE ? '圆形' : '多边形'),
      width: 100,
    },
  ],
  dataSource: [
    {
      createtime: 1653143796862,
      desc: '',
      gfid: 663116,
      modifytime: 1653220231956,
      name: '圆形围栏测试1',
      shape: {
        center: '104.02713,30.543607',
        radius: 304,
      },
    },
  ],
  selectedRowKeys: [],
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

const rowSelection = {
  onChange: (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys;
  },
};

// onMounted(search);
</script>
