<template>
  <a-layout id="page-view">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="1">
          <router-link to="/manage">
            <border-outer-outlined />
            <span>电子围栏</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="user">
          <a-dropdown
            overlay-class-name="page-view__dropdown"
            placement="bottomRight"
          >
            <div>
              <img
                src="../assets/img/avatar.png"
                alt="avatar"
              >
              <span
                class="ant-dropdown-link"
                @click.prevent
              >
                {{ store.username }}
              </span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="handleLogout">
                  <logout-outlined />退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  BorderOuterOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    BorderOuterOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      store,
      async handleLogout() {
        await store.logout();
        await router.push('/login');
      },
    };
  },

});
</script>

<style lang="less">
#page-view {
  width: 100vw;
  height: 100vh;
}

#page-view .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#page-view .trigger:hover {
  color: #1890ff;
}

#page-view .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

#page-view .user {
  float: right;
  padding: 0 20px 0 20px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: rgba(0,0,0,.025);
    transition: all .3s;
  }

  img {
    height: 24px;
    margin-right: 8px;
  }
}

.page-view__dropdown .ant-dropdown-menu {
  margin-right:  -18px;

  .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {
    color: rgba(0,0,0,.65);
  }

  .anticon {
    margin-right: 8px;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
