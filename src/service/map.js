export default class MapService {
  constructor() {
    if (!MapService.prototype.instance) {
      MapService.prototype.instance = this;
    }
    return MapService.prototype.instance;
  }

  getVector() {
    return new Promise((resolve) => {
      setTimeout(resolve, 300, {
        type: 'circle',
        center: [104.065735, 30.659462],
        radius: 100,
        vertexes: [],
      });
    });
  }

  updateVector() {
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  }
}
