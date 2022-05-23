<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '200px', right: '40px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const control = new AMap.MapType({ ...props });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
