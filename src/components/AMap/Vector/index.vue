<template>
  <div class="vector">
    <a-card
      title="区域围栏"
      style="width: 300px"
    >
      <template #extra>
        <a-button
          type="primary"
          shape="circle"
          ghost
          :disabled="!(vectorRef)"
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
        <a-radio-group
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
        </a-radio-group>
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
import { computed, defineComponent } from 'vue';
// import { useService } from '@/composables/map';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import use from './composable';
import { VECTOR_SHAPE_POLYGON, VECTOR_SHAPE_CIRCLE } from './constant';

export default defineComponent({
  components: {
    CheckCircleOutlined,
  },
  setup() {
    // const service = useService();
    const {
      typeRef, drawerRef, vectorRef, editorRef,
      // factory,
      start,
      stop,
      setType,
      clear,
      // mountVector,
    } = use();

    // service.getVector().then(mountVector);

    const reaOnlyRef = computed(() => !(drawerRef.value || editorRef.value));

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
