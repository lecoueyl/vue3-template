import {
  onBeforeUnmount, ref, shallowRef,
} from 'vue';
import { useInjectMap } from '@/composables/map';
import Factory from './factory';
import { DEFAULT_DRAW_STYLE, VECTOR_SHAPE_CIRCLE } from './constant';

export default function use() {
  const { AMap, map } = useInjectMap();
  const factory = new Factory({ AMap, map });

  const typeRef = ref(VECTOR_SHAPE_CIRCLE);
  const drawerRef = shallowRef(null);
  const vectorRef = shallowRef(null);
  const editorRef = shallowRef(null);

  const startAdjust = () => {
    editorRef.value = factory.createEditor(vectorRef.value);
    editorRef.value.open();
  };

  const stopAdjust = () => {
    if (editorRef.value) {
      editorRef.value.close();
      editorRef.value = null;
    }
  };

  const stopDraw = (ifClear = false) => {
    if (drawerRef.value) {
      drawerRef.value.close(ifClear);
      drawerRef.value = null;
    }
  };

  const startDraw = () => {
    drawerRef.value = new AMap.MouseTool(map);
    drawerRef.value[typeRef.value](DEFAULT_DRAW_STYLE);

    drawerRef.value.on('draw', ({ obj }) => {
      vectorRef.value = obj;
      map.setFitView();
      stopDraw();
      startAdjust();
    });
  };

  const start = () => {
    if (vectorRef.value) {
      startAdjust();
    } else {
      startDraw();
    }
  };

  const stop = (ifClear = false) => {
    stopAdjust();
    stopDraw(ifClear);
  };

  const mountVector = (config) => {
    typeRef.value = config.type;
    vectorRef.value = factory.createVector(config);
    map.add(vectorRef.value);
    map.setFitView();
  };

  const reStart = () => {
    if (vectorRef.value) {
      map.remove(vectorRef.value);
      vectorRef.value = null;
    }

    stop(true);
    start();
  };

  const setType = (type) => {
    typeRef.value = type;
    reStart();
  };

  onBeforeUnmount(() => {
    map.remove(drawerRef.value);
    reStart();
  });

  return {
    typeRef,
    drawerRef,
    vectorRef,
    editorRef,

    factory,
    start,
    stop,
    clear: reStart,
    setType,
    mountVector,
  };
}
