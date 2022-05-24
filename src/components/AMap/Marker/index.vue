<script>
import {
  onBeforeUnmount, defineComponent, shallowReactive, h, Comment,
} from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  name: 'AMapMarker',
  props: {
    position: {
      type: Array,
      default: () => [104.065735, 30.659462],
    },
    title: {
      type: String,
      default: '',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },

  setup(props) {
    const { AMap, map } = useInjectMap();

    const state = shallowReactive({
      marker: new AMap.Marker({
        map,
        position: new AMap.LngLat(...props.position),
        title: props.title,
        zIndex: props.zIndex,
      }),
    });

    map.add(state.marker);
    map.setFitView();

    onBeforeUnmount(() => {
      map.remove(state.marker);
    });

    return () => h(Comment, 'Empty');
  },
});
</script>
