// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import SaveSystem from "../../SaveSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class scriptV extends cc.Component {

    @property
    health: number = 100;

    @property
    speed: number = 100;

    @property
    strength: number = 100;

    @property
    resistence: number = 100;

    reprodutionRate: number = 0;
 

    public saveData(): void {
        SaveSystem.saveEntity(this, 'VData');
    }

    // Carrega os dados da entidade
    public loadData(): void {
        const data = SaveSystem.loadEntity('VData');
        if (data) {
            this.health = data.health;
            this.speed = data.speed;
            this.strength = data.strength;
            this.resistence = data.resistence;
            this.reprodutionRate = data.reprodutionRate;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.loadData()
    }



    // update (dt) {}
    // Aqui a gente vai usar para configurar o intervalo para salvar e também a mudança de atributos
    update(dt: number) {
        
        this.health -= dt * 0.1;
        this.speed += dt * 0.1;

        // Salva os dados a cada frame (ou em um intervalo específico)
        this.saveData();
    }
}

