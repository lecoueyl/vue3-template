import { VECTOR_SHAPE_POLYGON, VECTOR_SHAPE_CIRCLE } from './constant';

export default class Factory {
  constructor({ AMap, map }) {
    this.AMap = AMap;
    this.map = map;
  }

  createVector({
    type, center, radius, points,
  }) {
    const { AMap } = this;

    switch (type) {
      case VECTOR_SHAPE_POLYGON: {
        return new AMap.Polygon({
          path: points.split(';').map((position) => new AMap.LngLat(...position.split(','))),
        });
      }
      case VECTOR_SHAPE_CIRCLE: {
        return new AMap.Circle({
          center: new AMap.LngLat(...center.split(',')),
          radius,
        });
      }
      default: {
        throw new Error(`Unknown type ${type}`);
      }
    }
  }

  serializeVector(vector) {
    const { AMap } = this;
    const { constructor } = Object.getPrototypeOf(vector);

    switch (constructor) {
      case AMap.Polygon: {
        return {
          type: VECTOR_SHAPE_POLYGON,
          points: vector.getPath().map(({ lng, lat }) => `${lng},${lat}`).join(';'),
        };
      }
      case AMap.Circle: {
        // eslint-disable-next-line no-case-declarations
        const { lng, lat } = vector.getCenter();
        return {
          type: VECTOR_SHAPE_CIRCLE,
          center: `${lng},${lat}`,
          radius: parseInt(vector.getRadius(), 10),
        };
      }
      default: {
        throw new Error(`Unknown vector ${constructor}`);
      }
    }
  }

  createEditor(vector) {
    const { AMap, map } = this;
    const { constructor } = Object.getPrototypeOf(vector);

    switch (constructor) {
      case AMap.Polygon: {
        return new AMap.PolyEditor(map, vector);
      }
      case AMap.Circle: {
        return new AMap.CircleEditor(map, vector);
      }
      default: {
        throw new Error(`Unknown vector ${constructor}`);
      }
    }
  }
}
