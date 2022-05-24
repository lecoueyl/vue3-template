<script>
import {
  onBeforeUnmount, defineComponent, h, Comment,
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

    const control = {
      marker: new AMap.Marker({
        map,
        position: new AMap.LngLat(...props.position),
        title: props.title,
        zIndex: props.zIndex,
      }),
    };

    map.add(control);
    map.setFitView();

    onBeforeUnmount(() => {
      map.remove(control);
    });

    return () => h(Comment);
  },
});
</script>
