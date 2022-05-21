// https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t10
// https://lbs.amap.com/api/track/lieying-kaifa/api/fence_status#t3
import Base from './Base';

export default class GeoFence extends Base {
  addCircle({
    name, desc, center, radius,
  }) {
    this.request({
      method: 'post',
      url: '/add/circle',
      data: {
        key: this.key,
        sid: this.sid,
        name,
        desc,
        center: center.join(','),
        radius,
      },
    });
  }

  updateCircle({
    gfid, name, desc, center, radius,
  }) {
    this.request({
      method: 'post',
      url: '/update/circle',
      data: {
        key: this.key,
        sid: this.sid,
        gfid,
        name,
        desc,
        center: center.join(','),
        radius,
      },
    });
  }

  addPolygon({
    gfid, name, desc, points,
  }) {
    this.request({
      method: 'post',
      url: '/update/polygon',
      data: {
        key: this.key,
        sid: this.sid,
        gfid,
        name,
        desc,
        points: points.map((point) => point.join(',')).join(';'),
      },
    });
  }

  updatePolygon({
    name, desc, points,
  }) {
    this.request({
      method: 'post',
      url: '/add/polygon',
      data: {
        key: this.key,
        sid: this.sid,
        name,
        desc,
        points: points.map((point) => point.join(',')).join(';'),
      },
    });
  }

  delete(gfids = []) {
    this.request({
      method: 'post',
      url: '/geofence/delete',
      data: {
        key: this.key,
        sid: this.sid,
        gfids: gfids.join(','),
      },
    });
  }

  list({ gfids, page = 1, pagesize = 50 }) {
    this.request({
      method: 'get',
      url: '/geofence/list',
      outputshape: true,
      ...gfids ? { gfids } : {},
      page,
      pagesize,
    });
  }

  detail(gfid) {
    return this.list({ gfid });
  }

  statusByLocation({
    location, gfids, page = 1, pagesize = 50,
  }) {
    this.request({
      method: 'get',
      url: '/geofence/status/location',
      params: {
        key: this.key,
        sid: this.sid,
        location: location.join(','),
        gfids: gfids.join(','),
        page,
        pagesize,
      },
    });
  }
}
