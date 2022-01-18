<script setup>
import { onMounted } from 'vue';
import { currentTheme, initTheme, switchTheme } from '@/composables/theme.js';

onMounted(() => {
  initTheme();
});
</script>

<template>
  <header class="absolute inset-x-0 top-0">
    <div class="container flex justify-end p-4 mx-auto">
      <button
        class="overflow-hidden p-2"
        @click="switchTheme()"
      >
        <transition
          enter-active-class="transition duration-200 ease-out"
          leave-active-class="transition duration-200 ease-in"
          :enter-from-class="currentTheme === 'dark' ? 'transform -translate-y-full scale-50 opacity-0' : 'transform translate-y-full scale-50 opacity-0'"
          enter-to-class="transform translate-y-0"
          leave-from-class="transform translate-y-0"
          :leave-to-class="currentTheme === 'dark' ? 'transform translate-y-full scale-50 opacity-0' : 'transform -translate-y-full scale-50 opacity-0'"
          mode="out-in"
        >
          <svg
            v-if="currentTheme === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </transition>
      </button>
    </div>
  </header>

  <main class="flex flex-col justify-center items-center py-16 px-4 mx-auto max-w-3xl h-screen">
    <h1 class="pb-20 text-6xl text-center text-gray-700 dark:text-gray-100 transition-colors">
      Vue.js starter template
    </h1>

    <div class="flex justify-center pb-10 space-x-4">
      <a
        target="_blank"
        rel="noopener"
        href="https://open.vscode.dev/lecoueyl/vue3-template"
        class="inline-flex items-center py-4 px-6 space-x-1 font-medium text-indigo-50 bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xl hover:shadow-md transition duration-300"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="w-5 h-5 stroke-2"
        >
          <path d="M4 8l2-1l10 13l4-2V6l-4-2L6 17l-2-1z" />
        </svg>
        <span>Open in VSC</span>
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://github.com/lecoueyl/vue3-template"
        class="inline-flex items-center py-4 px-6 space-x-1 font-medium text-indigo-50 bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xl hover:shadow-md transition duration-300"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="w-5 h-5 stroke-2"
        >
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21" />
        </svg>
        <span>View on Github</span>
      </a>
    </div>
  </main>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMax meet"
    viewBox="0 0 998 260"
    fill="currentColor"
    class="absolute inset-x-0 bottom-0 -z-10 w-full text-indigo-300"
  >
    <g transform="translate(264 134)">
      <path
        d="M0,0 L86,0 L86,126 L0,126 L0,0 Z M10,10 L10,106 L76.3092784,106 L76.3092784,10 L10,10 Z M43,121 C45.7614237,121 48,118.761424 48,116 C48,113.238576 45.7614237,111 43,111 C40.2385763,111 38,113.238576 38,116 C38,118.761424 40.2385763,121 43,121 Z"
        opacity=".8"
      />
      <rect
        width="16"
        height="8"
        x="35"
        y="15"
      />
      <rect
        width="54"
        height="8"
        x="17"
        y="32"
        opacity=".8"
      />
      <rect
        width="34"
        height="8"
        x="26"
        y="44"
        opacity=".5"
      />
      <rect
        width="58"
        height="42"
        x="14"
        y="58"
        opacity=".8"
      />
    </g>
    <g transform="translate(784 141)">
      <path
        d="M0,0 L74,0 L74,119 L0,119 L0,0 Z M10,15 L10,99 L64,99 L64,15 L10,15 Z M37,114 C39.7614237,114 42,111.761424 42,109 C42,106.238576 39.7614237,104 37,104 C34.2385763,104 32,106.238576 32,109 C32,111.761424 34.2385763,114 37,114 Z M32.5,5 C31.1192881,5 30,6.11928813 30,7.5 C30,8.88071187 31.1192881,10 32.5,10 L43.5,10 C44.8807119,10 46,8.88071187 46,7.5 C46,6.11928813 44.8807119,5 43.5,5 L32.5,5 Z"
        opacity=".8"
      />
      <rect
        width="16"
        height="6"
        x="29"
        y="20"
      />
      <rect
        width="40"
        height="8"
        x="17"
        y="37"
        opacity=".8"
      />
      <rect
        width="26"
        height="6"
        x="24"
        y="49"
        opacity=".5"
      />
      <rect
        width="46"
        height="33"
        x="14"
        y="62"
        opacity=".8"
      />
    </g>
    <g transform="translate(0 80)">
      <path
        d="M0,0 L210,0 L210,180 L0,180 L0,0 Z M10,31 L10,170 L200,170 L200,31 L10,31 Z"
        opacity=".8"
      />
      <rect
        width="16"
        height="11"
        x="97"
        y="46"
      />
      <rect
        width="108"
        height="11"
        x="51"
        y="71"
        opacity=".8"
      />
      <rect
        width="40"
        height="11"
        x="85"
        y="87"
        opacity=".5"
      />
      <rect
        width="140"
        height="48"
        x="35"
        y="117"
        opacity=".8"
      />
      <rect
        width="190"
        height="10"
        x="10"
        y="10"
      />
    </g>
    <g transform="translate(590 100)">
      <rect
        width="110"
        height="160"
        opacity=".5"
      />
      <rect
        width="16"
        height="11"
        x="47"
        y="11"
      />
      <rect
        width="76"
        height="11"
        x="17"
        y="36"
        opacity=".8"
      />
      <rect
        width="34"
        height="11"
        x="38"
        y="52"
        opacity=".5"
      />
      <rect
        width="90"
        height="68"
        x="10"
        y="82"
        opacity=".8"
      />
    </g>
    <g
      transform="translate(730 80)"
      opacity=".404"
    >
      <rect
        width="54"
        height="180"
      />
      <rect
        width="10"
        height="180"
      />
      <rect
        width="10"
        height="180"
        x="22"
      />
      <rect
        width="10"
        height="180"
        x="44"
      />
    </g>
    <g transform="translate(490 134)">
      <rect
        width="100"
        height="100"
        y="26"
        opacity=".2"
      />
      <rect
        width="42"
        height="126"
        x="29"
        opacity=".3"
      />
    </g>
    <g transform="translate(210 80)">
      <rect
        width="54"
        height="126"
        y="54"
        opacity=".2"
      />
      <polygon
        points="54 0 54 54 0 54"
        opacity=".3"
      />
    </g>
    <g transform="translate(424 8)">
      <rect
        width="66"
        height="186"
        y="66"
        opacity=".4"
      />
      <rect
        width="12"
        height="166"
        x="10"
        y="76"
        opacity=".8"
      />
      <rect
        width="12"
        height="166"
        x="44"
        y="76"
        opacity=".8"
      />
      <polygon
        points="33 0 66 66 0 66"
        opacity=".6"
      />
    </g>
    <g transform="translate(700 178)">
      <polygon
        points="15 63 30 82 0 82"
        opacity=".5"
      />
      <circle
        cx="15"
        cy="15"
        r="15"
        opacity=".5"
      />
      <rect
        width="30"
        height="68"
        y="14"
        opacity=".3"
      />
    </g>
    <path
      d="M888,10 L893,15 L898,10 L888,10 Z M878.126582,10.1265823 L868.5,20 L878.126582,29.8734177 L888,20 L878.126582,10.1265823 Z M927.5,10 L917.75,10 L922.625,15 L927.5,10 Z M937,10.2564103 L927.5,20 L937,29.7435897 L937,10.2564103 Z M917.75,30 L927.5,30 L922.625,25 L917.75,30 Z M898,30 L893,25 L888,30 L898,30 Z M898,20 L908,30 L917.75,20 L908,10 L898,20 Z M829,10 L834,15 L839,10 L829,10 Z M819.126582,10.1265823 L809,20.5128205 L818.25,30 L819,30 L829,20 L819.126582,10.1265823 Z M868.5,10 L858.75,10 L863.625,15 L868.5,10 Z M858.75,30 L868.5,30 L863.625,25 L858.75,30 Z M839,30 L834,25 L829,30 L839,30 Z M839,20 L849,30 L858.75,20 L849,10 L839,20 Z M770,10 L774.5,14.5 L779,10 L770,10 Z M760,10 L759.25,10 L749.5,20 L759.126582,29.8734177 L769.5,19.5 L760,10 Z M809.5,10 L798.75,10 L804.125,15.5128205 L809.5,10 Z M799.75,30 L808.5,30 L804.125,25.5128205 L799.75,30 Z M780,30 L774.5,24.5 L769,30 L780,30 Z M779.5,19.5 L790,30 L799.25,20.5128205 L789,10 L779.5,19.5 Z M710,10 L715,15 L720,10 L710,10 Z M700,10 L699.25,10 L689.5,20 L699.25,30 L700,30 L710,20 L700,10 Z M749.5,10 L739.75,10 L744.625,15 L749.5,10 Z M739.75,30 L749.5,30 L744.625,25 L739.75,30 Z M720,30 L715,25 L710,30 L720,30 Z M720,20 L730,30 L739.75,20 L730,10 L720,20 Z M689.5,10 L679.75,10 L684.625,15 L689.5,10 Z M679.75,30 L689.5,30 L684.625,25 L679.75,30 Z M660,30 L655,25 L650,30 L660,30 Z M660,20 L670,30 L679.75,20 L670,10 L660,20 Z M635,40 L625,40 L665,0 L668.5,0 L947,0 L947,40 L635,40 Z M858,80 L857.998438,70.0015618 L858,70 L857.989064,69.9890642 L857.987502,59.987502 L858,60 L858,40.012498 L857.987502,40 L858,39.987502 L858,40 L862.993751,40 L898,40 L898,260 L858,260 L857.998438,250.001562 L858,220.012498 L857.987502,220 L858,219.987502 L858,200 L857.998438,190.001562 L857.989064,189.989064 L857.987502,179.987502 L858,180 L858,160.012498 L857.987502,160 L858,159.987502 L858,140 L857.998438,130.001562 L857.989064,129.989064 L857.987502,119.987502 L858,120 L858,100.012498 L857.987502,100 L858,99.987502 L858,80 Z M888,60.012498 L888,50 L882.993751,55.006249 L888,60.012498 Z M888,40 L868,40 L868,40.012498 L877.993751,50.006249 L888,40 Z M868,50.012498 L868,60 L872.993751,55.006249 L868,50.012498 Z M868,70 L877.993751,79.993751 L887.987502,70 L877.993751,60.006249 L868,70 Z M888,120.012498 L888,110 L882.993751,115.006249 L888,120.012498 Z M887.987502,130 L877.993751,120.006249 L868,130 L877.993751,139.993751 L887.987502,130 Z M888,79.987502 L882.993751,84.993751 L888,90 L888,79.987502 Z M868,89.987502 L872.993751,84.993751 L868,80 L868,89.987502 Z M868,99.987502 L868,100.012498 L877.993751,110.006249 L888,100 L877.993751,89.993751 L868,99.987502 Z M868,110.012498 L868,120 L872.993751,115.006249 L868,110.012498 Z M888,180.012498 L888,170 L882.993751,175.006249 L888,180.012498 Z M887.987502,190 L877.993751,180.006249 L868,190 L877.993751,199.993751 L887.987502,190 Z M888,139.987502 L882.993751,144.993751 L888,150 L888,139.987502 Z M868,149.987502 L872.993751,144.993751 L868,140 L868,149.987502 Z M868,159.987502 L868,160.012498 L877.993751,170.006249 L888,160 L877.993751,149.993751 L868,159.987502 Z M868,170.012498 L868,180 L872.993751,175.006249 L868,170.012498 Z M888,199.987502 L882.993751,204.993751 L888,210 L888,199.987502 Z M888,240.012498 L888,230 L882.993751,235.006249 L888,240.012498 Z M887.987502,250 L877.993751,240.006249 L868,250 L887.987502,250 Z M868,230.012498 L868,240 L872.993751,235.006249 L868,230.012498 Z M868,220.012498 L877.993751,230.006249 L888,220 L877.993751,209.993751 L868,219.987502 L868,220.012498 Z M868,209.987502 L872.993751,204.993751 L868,200 L868,209.987502 Z"
      opacity=".4"
    />
    <g transform="translate(350 173)">
      <path
        d="M74,37 C74,16.5654643 57.4345357,0 37,0 C16.5654643,0 0,16.5654643 0,37 L74,37 Z"
        opacity=".2"
      />
      <rect
        width="74"
        height="50"
        y="37"
        opacity=".3"
      />
      <path
        d="M49,37.3428571 C49,30.5260854 43.627417,25 37,25 C30.372583,25 25,30.5260854 25,37.3428571 L49,37.3428571 Z"
        opacity=".2"
      />
    </g>
    <rect
      width="100"
      height="80"
      x="898"
      y="180"
      opacity=".2"
    />
    <rect
      width="24"
      height="20"
      x="936"
      y="240"
      opacity=".4"
    />
    <rect
      width="80"
      height="10"
      x="908"
      y="195"
      opacity=".2"
    />
    <rect
      width="80"
      height="10"
      x="908"
      y="215"
      opacity=".2"
    />
  </svg>
</template>

<style>
body {
  @apply dark:bg-gray-900 dark:text-gray-50;
}
</style>
