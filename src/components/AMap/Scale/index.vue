<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  name: 'AMapScale',
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '50px', left: '40px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const control = new AMap.Scale({ ...props });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
