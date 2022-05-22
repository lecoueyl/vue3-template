<template>
  <div class="vector">
    <a-card
      v-if="!props.readOnly"
      title="区域围栏"
      style="width: 300px"
    >
      <template #extra>
        <a-button
          type="primary"
          shape="circle"
          ghost
          :disabled="!(vectorRef)"
          @click="handleSubmit"
        >
          <template #icon>
            <check-circle-outlined />
          </template>
        </a-button>
      </template>
      <div v-show="reaOnlyRef">
        <a-button @click="start">
          开始
        </a-button>
      </div>
      <div v-show="!reaOnlyRef">
        <!-- <a-radio-group
          :value="typeRef"
          button-style="solid"
          @change="setType($event.target.value)"
        >
          <a-radio-button :value="VECTOR_SHAPE_POLYGON">
            多边形
          </a-radio-button>
          <a-radio-button :value="VECTOR_SHAPE_CIRCLE">
            圆形
          </a-radio-button>
        </a-radio-group> -->
        <a-button
          :disabled="!(vectorRef)"
          @click="stop"
        >
          完成
        </a-button>
        <a-button
          :disabled="!(vectorRef)"
          @click="clear"
        >
          清空
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import GeoFenceService from '@/service/GeoFence';
import use from './composable';
import { VECTOR_SHAPE_POLYGON, VECTOR_SHAPE_CIRCLE } from './constant';

export default defineComponent({
  components: {
    CheckCircleOutlined,
  },
  props: {
    gfid: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {
      typeRef, drawerRef, vectorRef, editorRef,
      factory,
      start,
      stop,
      setType,
      clear,
      mountVector,
    } = use();
    const reaOnlyRef = computed(() => !(drawerRef.value || editorRef.value));

    const infoState = reactive({});

    const service = new GeoFenceService();

    if (props.gfid) {
      service.detail(props.gfid).then((res) => {
        const {
          gfid, name, desc, ...rest
        } = res;
        Object.assign(infoState, { gfid, name, desc });
        mountVector(rest);
      });
    }

    const handleSubmit = () => {
      const payload = {
        ...factory.serializeVector(vectorRef.value),
        ...infoState,
      };
      if (infoState.gfid) {
        service.update(payload);
      } else {
        service.add(payload);
      }
    };

    return {
      typeRef,
      drawerRef,
      vectorRef,
      editorRef,
      setType,
      VECTOR_SHAPE_POLYGON,
      VECTOR_SHAPE_CIRCLE,
      start,
      stop,
      clear,
      reaOnlyRef,
      handleSubmit,
      props,
    };
  },
});
</script>

<style>
.vector {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 1;
  border-radius: 4px;
}
</style>
