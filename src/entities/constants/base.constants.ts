interface IConstantEntitity {
    name: string;
    value: any;
}

export abstract class ConstantGroup<T extends IConstantEntitity> {
    public abstract list(): T[];

    public map(): Map<string|number, T> {
        const initialMap = new Map<string|number,T>();
        return this.list().reduce((map, obj) => {
            map.set(obj.value, obj)
            return map;
        }, initialMap);
    }

}

export class ConstantEntity implements IConstantEntitity {
    public name: string;
    public readonly value: number;

    constructor(obj: IConstantEntitity) {
        this.name = obj.name;
        this.value = obj.value;
    }
}

export class ConstantIconEntity extends ConstantEntity {
    public readonly iconPNG: string;

    constructor(obj: IConstantEntitity) {
        super(obj);
        this.iconPNG = './' + obj.name + '.png';
    }
}

