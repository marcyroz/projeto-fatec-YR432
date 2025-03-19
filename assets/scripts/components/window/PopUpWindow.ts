const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = 'hello';

  private isOpen: boolean = false;
  private isAnimating: boolean = false;

  onLoad() {
    this.node.active = false;
  }

  Show_Window() {
    if (this.isAnimating || this.isOpen) return;

    this.isOpen = true;
    this.isAnimating = true;
    this.node.active = true;

    this.node.opacity = 0;
    this.node.scale = 0.2;

    cc.tween(this.node)
      .to(0.5, { opacity: 255, scale: 1 }, { easing: 'quartInOut' })
      .call(() => {
        this.isAnimating = false;
      })
      .start();
  }

  Hide_Window() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isOpen = false;

    cc.tween(this.node)
      .to(0.5, { opacity: 0, scale: 0.2 }, { easing: 'quartInOut' })
      .call(() => {
        this.node.active = false;
        this.isAnimating = false;
      })
      .start();
  }

  Choice_clicked() {
    this.Hide_Window();
  }
}
