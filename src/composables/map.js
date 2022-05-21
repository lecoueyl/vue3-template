import { provide, inject } from 'vue';

const key = Symbol('__');

export const useProvideMap = (val) => provide(key, val);

export const useInjectMap = () => inject(key);
