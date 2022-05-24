<template>
  <div class="a-map__vector">
    <a-card v-if="!props.readOnly">
      <a-form
        :model="formState"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="16">
            <a-form-item>
              <a-input
                v-model:value="formState.name"
                show-count
                :maxlength="20"
                placeholder="名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-select
                v-model:value="formState.type"
                disabled
              >
                <a-select-option :value="FENCE_SHAPE_POLYGON">
                  多边形
                </a-select-option>
                <a-select-option :value="FENCE_SHAPE_CIRCLE">
                  圆形
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item>
              <a-textarea
                v-model:value="formState.desc"
                placeholder="描述"
                allow-clear
                :maxlength="100"
                show-count
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col
            :span="6"
            :offset="2"
          >
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :disabled="!(formState.name && formState.desc && formState.type && vectorRef)"
              >
                保存
              </a-button>
            </a-form-item>
          </a-col>
          <template v-if="reaOnlyRef">
            <a-col
              :span="8"
              :offset="4"
            >
              <a-form-item>
                <a-button @click="start">
                  {{ vectorRef ? '继续' : '开始' }}绘制
                </a-button>
              </a-form-item>
            </a-col>
          </template>
          <template v-else>
            <a-col :span="8">
              <a-form-item>
                <a-button
                  :disabled="!(vectorRef)"
                  @click="stop"
                >
                  结束绘制
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-button
                  :disabled="!(vectorRef)"
                  @click="clear"
                >
                  清空绘制
                </a-button>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import GeoFenceService from '@/service/GeoFence';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { FENCE_SHAPE_POLYGON, FENCE_SHAPE_CIRCLE } from '@/constants/index';
import use from './composable';

export default defineComponent({
  name: 'AMapVector',
  props: {
    gfid: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: FENCE_SHAPE_CIRCLE,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    // TODO: 支持传入整个 config
  },
  setup(props) {
    const {
      typeRef, drawerRef, vectorRef, editorRef,
      factory,
      start,
      stop,
      clear,
      mountVector,
    } = use(props.type);
    const reaOnlyRef = computed(() => !(drawerRef.value || editorRef.value));
    const router = useRouter();

    const formState = reactive({
      gfid: props.gfid,
      type: props.type,
      name: '',
      desc: '',
    });

    const service = new GeoFenceService();

    if (formState.gfid) {
      service.detail(formState.gfid).then((res) => {
        const {
          name, desc, ...rest
        } = res;
        Object.assign(formState, { name, desc });
        mountVector(rest);
      });
    }

    const handleSubmit = async () => {
      const payload = {
        ...factory.serializeVector(vectorRef.value),
        ...formState,
      };
      if (formState.gfid) {
        await service.update(payload);
        message.success('编辑成功');
      } else {
        await service.add(payload);
        message.success('新增成功');
      }
      router.push('/manage');
    };

    return {
      typeRef,
      drawerRef,
      vectorRef,
      editorRef,
      FENCE_SHAPE_POLYGON,
      FENCE_SHAPE_CIRCLE,
      start,
      stop,
      clear,
      reaOnlyRef,
      handleSubmit,
      props,
      formState,
    };
  },
});
</script>

<style lang="less">
.a-map__vector {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 1;

  .ant-card-body {
    padding: 10px;
}

  .ant-card-bordered {
    border-radius: 4px;
  }

  .ant-form-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
