import Preloader from "../common/Preloader";

export default class SinglePreloader extends Preloader {
  completeLoading() {
    this.scene.start("single", { character: this.selectedCharacter });
  }
}
