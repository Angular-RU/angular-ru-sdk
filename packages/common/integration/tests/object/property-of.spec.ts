import { propertyOf } from '@angular-ru/common/object';

describe('[TEST]: Property of', (): void => {
    class EntityA {
        public aaa: string = 'aaa';
        public bbb: number = 123;
        public ccc: boolean = true;
    }

    type entityB = {
        aaa: string;
        bbb: number;
        ccc: boolean;
    };

    class EntityB {
        public aaa: string = 'aaa';
        public bbb: number = 123;
        public ccc: boolean = true;
        public ddd: EntityA = new EntityA();
        public eee: entityB = {
            aaa: 'aaa',
            bbb: 111,
            ccc: true
        };
    }

    it('should return name of class property as string', (): void => {
        const propertyAaa: string = propertyOf<EntityB>('aaa');
        const propertyBbb: string = propertyOf<EntityB>('bbb');
        const propertyCcc: string = propertyOf<EntityB>('ccc');
        const propertyDdd: string = propertyOf<EntityB>('ddd');
        const propertyEee: string = propertyOf<EntityB>('eee');

        expect(propertyAaa).toBe('aaa');
        expect(propertyBbb).toBe('bbb');
        expect(propertyCcc).toBe('ccc');
        expect(propertyDdd).toBe('ddd');
        expect(propertyEee).toBe('eee');
    });

    it('should return name of type property as string', (): void => {
        const propertyAaa: string = propertyOf<entityB>('aaa');
        const propertyBbb: string = propertyOf<entityB>('bbb');
        const propertyCcc: string = propertyOf<entityB>('ccc');

        expect(propertyAaa).toBe('aaa');
        expect(propertyBbb).toBe('bbb');
        expect(propertyCcc).toBe('ccc');
    });
});
