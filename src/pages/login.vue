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

export default defineComponent({
  setup() {
    const router = useRouter();

    const formState = reactive({
      username: 'admin',
      password: 'admin',
    });

    // TODO: 鉴权与持久化
    const onSuccess = () => {
      router.push('/manage');
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
  // TODO
  background-image: url(https://preview.pro.antdv.com/assets/background.ebcb9160.svg);

  .ant-form {
    width: 600px;
    height: 300px;
  }
}
</style>
