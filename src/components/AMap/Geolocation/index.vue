<script>
import {
  defineComponent, onBeforeUnmount, onMounted,
} from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    showCircle: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['init'],
  setup(props, { expose, emit }) {
    const { AMap, map } = useInjectMap();
    const geolocation = new AMap.Geolocation({ position: { bottom: '90px', right: '40px' }, ...props });
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

    // TODO: 待调试
    // const useCurrentLocation = () => {
    //   const locationRef = ref([]);
    //   let timer = null;

    //   const setLocation = async () => {
    //     locationRef.value = await getCurrentPosition();
    //   };

    //   const unWatch = () => {
    //     if (timer) {
    //       clearInterval(timer);
    //       timer = null;
    //     }
    //     map.remove(geolocation);
    //   };

    //   timer = setInterval(setLocation, 1000 * 10);
    //   setLocation();

    //   onBeforeUnmount(unWatch);

    //   return { locationRef };
    // };

    expose({ getCurrentPosition });

    onMounted(() => {
      emit('init');
    });

    onBeforeUnmount(() => {
      map.remove(geolocation);
    });
  },
});
</script>
