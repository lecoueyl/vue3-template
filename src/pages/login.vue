<template>
  <div class="login">
    <a-form
      :model="formState"
      name="basic"
      :wrapper-col="{ offset: 6, span: 12 }"
      autocomplete="off"
      @finish="onSuccess"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="用户名: admin"
          allow-clear
          size="large"
        />
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          placeholder="密码: admin"
          allow-clear
          size="large"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 6, span: 12 }">
        <a-button
          block
          type="primary"
          html-type="submit"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const formState = reactive({
      username: 'admin',
      password: 'admin',
    });

    const onSuccess = async (values) => {
      // TODO: loading effect
      await store.login(values);
      await router.push('/manage');
    };

    return {
      formState,
      onSuccess,
    };
  },

});
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/svg/background.svg");

  .ant-form {
    width: 600px;
    height: 300px;
  }
}
</style>
