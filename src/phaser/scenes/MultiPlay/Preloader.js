import Preloader from "../common/Preloader";

export default class MultiPreloader extends Preloader {
  completeLoading() {
    this.scene.start("multi");
  }
}
