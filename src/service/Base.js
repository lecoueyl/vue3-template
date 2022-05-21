import request from '@/utils/request';

export default class Base {
  constructor() {
    if (!Base.prototype.instance) {
      Base.prototype.instance = this;
      this.request = request;
      this.key = import.meta.env.VITE_AMAP_WEB_KEY;
      this.sid = import.meta.env.VITE_AMAP_TRACK_SID;
    }
    return Base.prototype.instance;
  }
}
