import request from '@/utils/request';

export default class BaseService {
  constructor() {
    const { constructor } = this;

    if (!constructor.prototype.instance) {
      constructor.prototype.instance = this;
      this.request = request;
      this.key = import.meta.env.VITE_AMAP_WEB_KEY;
      this.sid = import.meta.env.VITE_AMAP_TRACK_SID;
    }
    return constructor.prototype.instance;
  }
}
