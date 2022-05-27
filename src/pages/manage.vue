<template>
  <div id="manage">
    <a-tabs
      v-model:activeKey="state.activeTabKey"
      type="card"
    >
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
              <a-menu @click="handleAdd">
                <a-menu-item :key="Constants.DICTS.FENCE_TYPE_CIRCLE">
                  圆形围栏
                </a-menu-item>
                <a-menu-item :key="Constants.DICTS.FENCE_TYPE_POLYGON">
                  多边形围栏
                </a-menu-item>
              </a-menu>
            </template>
            <a-button type="primary">
              新建围栏
              <DownOutlined />
            </a-button>
          </a-dropdown>
          <a-popconfirm
            title="是否确认删除选中围栏？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete"
          >
            <a-button
              danger
              :disabled="!state.selectedRowKeys.length"
            >
              删除
            </a-button>
          </a-popconfirm>
          <a-button
            :disabled="state.selectedRowKeys.length !== 1"
            @click="handleEdit"
          >
            编辑
          </a-button>
          <a-button
            :style="{ float: 'right' }"
            @click="handleSearch"
          >
            查询
          </a-button>
          <a-table
            row-key="gfid"
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
        :disabled="!state.dataSource.length"
      >
        <!-- TODO: 使用 watch 改进 -->
        <fence-view
          v-if="state.activeTabKey === '2'"
          :fences="state.dataSource"
        />
      </a-tab-pane>
    </a-tabs>
    <a-modal
      v-model:visible="state.previewVisible"
      title="使用手机扫描二维码进入"
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
import { GeoFenceService } from '@/service';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';
import Constants from '@/constants';
import QrcodeVue from 'qrcode.vue';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
    DownOutlined,
    QrcodeVue,
  },
  setup() {
    const service = new GeoFenceService();
    const router = useRouter();

    const state = reactive({
      activeTabKey: '1',
      previewVisible: false,
      previewURL: `${window.location.origin}/#/sign-in`,
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          width: 240,
        },
        {
          title: '描述',
          dataIndex: 'desc',
          ellipsis: true,
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: 100,
          customRender: ({ text }) => (text === Constants.DICTS.FENCE_TYPE_CIRCLE ? '圆形' : '多边形'),
        },
        {
          title: '创建时间',
          dataIndex: 'createtime',
          width: 200,
          customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          title: '更新时间',
          dataIndex: 'createtime',
          width: 200,
          customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,
    });

    const handleSearch = async () => {
      try {
        state.loading = true;
        const { results } = await service.list();
        Object.assign(state, {
          dataSource: results,
          selectedRowKeys: [],
        });
      } finally {
        state.loading = false;
      }
    };

    const handleDelete = async () => {
      try {
        state.loading = true;
        await service.delete(state.selectedRowKeys);
        await handleSearch();
      } finally {
        state.loading = false;
      }
    };

    const handleAdd = ({ key }) => {
      router.push({
        path: '/fence/add',
        query: { type: key },
      });
    };

    const handleEdit = () => {
      const [{ gfid, type }] = state.selectedRows;
      router.push({
        path: '/fence/edit',
        query: { gfid, type },
      });
    };

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        state.selectedRowKeys = selectedRowKeys;
        state.selectedRows = selectedRows;
      },
    };

    handleSearch();

    return {
      Constants,
      state,
      rowSelection,
      handleSearch,
      handleDelete,
      handleAdd,
      handleEdit,
    };
  },
});
</script>

<style lang="less">
#manage {
  height: 100%;

  & .ant-btn {
    margin-right: 8px;
    margin-bottom: 12px;
  }

  .ant-tabs {
    height: 100%;

    .ant-tabs-nav {
      height: 44px;
    }

    .ant-tabs-content-holder {
      height: calc(100% - 44px);

      .ant-tabs-content {
        height: 100%;
      }
    }
  }
}
</style>
