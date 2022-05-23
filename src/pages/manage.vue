<template>
  <div>
    <a-tabs type="card">
      <template #rightExtra>
        <a-button
          :disabled="!state.dataSource.length"
          @click="state.previewVisible = true"
        >
          在手机上预览
        </a-button>
      </template>
      <a-tab-pane
        key="1"
        tab="围栏列表"
      >
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
      </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="围栏预览"
      >
      <!-- <fence-view :fences="state.dataSource" /> -->
      </a-tab-pane>
    </a-tabs>
    <a-modal
      v-model:visible="state.previewVisible"
      title="Basic Modal"
      :width="520"
      :footer="null"
    >
      <qrcode-vue
        :value="state.previewURL"
        size="480"
      />
    </a-modal>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import GeoFenceService from '@/service/GeoFence';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';
import { FENCE_SHAPE_POLYGON, FENCE_SHAPE_CIRCLE } from '@/constants/index';
// import { FenceView } from '@/components/Fence/index';
import QrcodeVue from 'qrcode.vue';

export default defineComponent({
  components: {
    // FenceView,
    QrcodeVue,
  },
  setup() {
    const service = new GeoFenceService();
    const router = useRouter();

    const state = reactive({
      previewVisible: false,
      previewURL: `${window.location.href}/#/sign-in`,
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

    return { state, search, rowSelection };
  },
});
</script>
