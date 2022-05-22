import qs from 'qs';
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
    // TODO
    return type === 'circle' ? this.addCircle(rest) : this.addPolygon(rest);
  }

  update({ type, ...rest }) {
    // TODO
    return type === 'circle' ? this.updateCircle(rest) : this.updatePolygon(rest);
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
  list({ gfids, page = 1, pagesize = 50 } = {}) {
    // TODO: outputshape 并未直接表明围栏类型
    return this.request({
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
  }

  /**
   * 围栏详情
   * @param {*} gfid
   * @returns
   */
  async detail(gfid) {
    const { results } = await this.list({ gfid });
    if (results.length) {
      const {
        name, desc, shape,
      } = results[0];
      const result = {
        gfid, name, desc, ...shape,
      };

      Object.assign(result, {
        type: shape.center ? 'circle' : 'polygon',
      });

      return result;
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
}
