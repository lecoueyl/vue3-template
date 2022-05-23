import qs from 'qs';
import { FENCE_SHAPE_POLYGON, FENCE_SHAPE_CIRCLE } from '@/constants/index';
import Base from './Base';

export default class GeoFenceService extends Base {
  /**
   * 创建圆形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t2
   * @param {*} param0
   * @returns
   */
  addCircle({
    name = '', desc = '', center, radius,
  }) {
    return this.request({
      method: 'post',
      url: '/geofence/add/circle',
      data: qs.stringify({
        key: this.key,
        sid: this.sid,
        name,
        desc,
        center,
        radius,
      }),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 更新圆形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t6
   * @param {*} param0
   * @returns
   */
  updateCircle({
    gfid, name = '', desc = '', center, radius,
  }) {
    return this.request({
      method: 'post',
      url: '/geofence/update/circle',
      data: qs.stringify({
        key: this.key,
        sid: this.sid,
        gfid,
        name,
        desc,
        center,
        radius,
      }),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 创建多边形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t3
   * @param {*} param0
   */
  addPolygon({
    name = '', desc = '', points,
  }) {
    this.request({
      method: 'post',
      url: '/geofence/add/polygon',
      data: qs.stringify({
        key: this.key,
        sid: this.sid,
        name,
        desc,
        points,
      }),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 更新多边形围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t7
   * @param {*} param0
   */
  updatePolygon({
    gfid, name = '', desc = '', points,
  }) {
    this.request({
      method: 'post',
      url: '/geofence/update/polygon',
      data: qs.stringify({
        key: this.key,
        sid: this.sid,
        gfid,
        name,
        desc,
        points,
      }),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  add({ type, ...rest }) {
    return type === FENCE_SHAPE_CIRCLE ? this.addCircle(rest) : this.addPolygon(rest);
  }

  update({ type, ...rest }) {
    return type === FENCE_SHAPE_CIRCLE ? this.updateCircle(rest) : this.updatePolygon(rest);
  }

  /**
   * 删除围栏
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t10
   * @param {*} gfids
   * @returns
   */
  delete(gfids = []) {
    return this.request({
      method: 'post',
      url: '/geofence/delete',
      data: qs.stringify({
        key: this.key,
        sid: this.sid,
        gfids: gfids.join(','),
      }),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * 查询围栏列表
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/track_fence#t11
   * @param {*} param0
   * @returns
   */
  async list({ gfids, page = 1, pagesize = 50 } = {}) {
    const { results, ...rest } = await this.request({
      method: 'get',
      url: '/geofence/list',
      params: {
        key: this.key,
        sid: this.sid,
        outputshape: '1',
        ...gfids ? { gfids } : {},
        page,
        pagesize,
      },
    });

    results.forEach((r) => {
      Object.assign(r, {
        type: Object.prototype.hasOwnProperty.call(r.shape, 'radius') ? FENCE_SHAPE_CIRCLE : FENCE_SHAPE_POLYGON,
      });
    });

    return { results, ...rest };
  }

  /**
   * 围栏详情
   * @param {*} gfid
   * @returns
   */
  async detail(gfid) {
    const { results } = await this.list({ gfid });
    if (results.length) {
      const { shape, ...rest } = results[0];
      return { ...shape, ...rest };
    }
    return null;
  }

  /**
   * 查询指定坐标与围栏关系
   * @see https://lbs.amap.com/api/track/lieying-kaifa/api/fence_status#t3
   * @param {*} param0
   * @returns
   */
  statusByLocation({
    location, gfids, page = 1, pagesize = 50,
  }) {
    console.log(this);
    return this.request({
      method: 'get',
      url: '/geofence/status/location',
      params: {
        key: this.key,
        sid: this.sid,
        location: location.join(','),
        ...gfids ? { gfids: gfids.join(',') } : {},
        page,
        pagesize,
      },
    });
  }

  /**
   * 查询指定坐标是否在指定围栏内
   * @param {*} param0
   * @returns
   */
  async isWithinFences({ location, gfids }) {
    const { results } = await this.statusByLocation({ location, gfids });
    return results.find((r) => r.in === '1');
  }
}
