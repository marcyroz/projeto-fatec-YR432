const { ccclass } = cc._decorator;

@ccclass
export default class SaveSystem {

    // Salva os dados de uma entidade
    public static saveEntity(entity: any, key: string): void {
        const data = {
            health: entity.health,
            speed: entity.speed,
            resistence: entity.resistence,
            infected: entity.infected, 
            strength: entity.strength, 
            reprodutionRate: entity.reprodutionRate 
        };

        const jsonString = JSON.stringify(data);
        cc.sys.localStorage.setItem(key, jsonString);
    }

    // Carrega os dados de uma entidade
    public static loadEntity(key: string): any | null {
        const jsonString = cc.sys.localStorage.getItem(key);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    }

    // Remove os dados de uma entidade
    public static deleteEntity(key: string): void {
        cc.sys.localStorage.removeItem(key);
    }
}