<script>
import { defineComponent, onBeforeUnmount, ref } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  setup(props, { expose }) {
    const { AMap, map } = useInjectMap();
    const geolocation = new AMap.Geolocation({ position: { bottom: '40px', right: '40px' } });
    map.addControl(geolocation);

    const getCurrentPosition = () => new Promise((resolve, reject) => {
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          resolve([
            result.position.getLng(),
            result.position.getLat(),
          ]);
        } else {
          reject(result);
        }
      });
    });

    // TODO: 改为 composable
    const watchCurrentPosition = () => {
      const positionRef = ref([]);
      let timer = null;

      const unWatch = () => {
        clearInterval(timer);
        timer = null;
      };

      timer = setInterval(async () => {
        positionRef.value = await getCurrentPosition();
      }, 1000 * 10);
      onBeforeUnmount(unWatch);

      return { positionRef, unWatch };
    };

    expose({ getCurrentPosition, watchCurrentPosition });

    onBeforeUnmount(() => {
      map.remove(geolocation);
    });
  },
});
</script>
