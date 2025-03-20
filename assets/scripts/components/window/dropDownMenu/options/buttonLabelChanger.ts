import { Entities } from '../../../../objects/Entities';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonLabelChanger extends cc.Component {
  @property(cc.Button)
  targetButton: cc.Button = null;

  @property(cc.Node)
  infoPanel: cc.Node = null;

  private targetLabel: cc.Label = null;

  onLoad() {
    this.targetLabel = this.targetButton.node
      .getChildByName('Label')
      .getComponent(cc.Label);

    this.node.children.forEach((buttonNode) => {
      let button = buttonNode.getComponent(cc.Button);
      if (button) {
        button.node.on('click', () => this.changeLabel(button), this);
      }
    });
  }

  changeLabel(clickedButton: cc.Button) {
    let clickedLabel = clickedButton.node
      .getChildByName('Label')
      .getComponent(cc.Label);

    if (clickedLabel && this.targetLabel) {
      const selectedEntity = Entities[clickedLabel.string];

      if (selectedEntity) {
        this.targetLabel.string = clickedLabel.string;
        this.updateInfoPanel(selectedEntity);
      }
    }
  }

  updateInfoPanel(entityData: any) {
    if (!this.infoPanel) return;

    let infoLabel = this.infoPanel.getComponent(cc.RichText);
    if (infoLabel) {
      // Format the text with color based on value
      let healthText = this.formatAttribute('Vida: ', entityData.health);
      let speedText = this.formatAttribute('Velocidade: ', entityData.speed);
      let strengthText = this.formatAttribute('Força: ', entityData.strength);
      let resistenceText = this.formatAttribute(
        'Resistência: ',
        entityData.resistence
      );

      // Set the formatted text in the RichText component
      infoLabel.string =
        `${healthText}\n` +
        `${speedText}\n` +
        `${strengthText}\n` +
        `${resistenceText}`;
    }

    this.infoPanel.active = true;
  }

  // Format the attribute text with color based on its value
  formatAttribute(labelText: string, value: number): string {
    // Color only the number part
    let coloredValue =
      value >= 0
        ? `<color=#00FF00>${value}</color>`
        : `<color=#FF0000>${value}</color>`;
    return `${labelText}${coloredValue}`;
  }
}
