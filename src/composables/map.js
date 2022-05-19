import { provide, inject } from 'vue';
import MapService from '@/service/map';

const key = Symbol('__');

export const useProvideMap = (val) => provide(key, val);

export const useInjectMap = () => inject(key);

export const useService = () => new MapService();
