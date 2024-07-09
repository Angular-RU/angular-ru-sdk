import {actionNameCreator, MethodArgsRegistry} from '@angular-ru/ngxs/internals';

describe('[TEST]: actionNameCreator', () => {
    it('should be correct', () => {
        expect(
            actionNameCreator({statePath: 'A', methodName: 'a', argumentsNames: []}),
        ).toBe('@A.a()');

        expect(
            actionNameCreator({
                statePath: 'A',
                methodName: 'a',
                argumentsNames: ['x', 'y', 'z'],
            }),
        ).toBe('@A.a($arg0, $arg1, $arg2)');
    });

    it('should be correct create nested statePath', () => {
        expect(
            actionNameCreator({statePath: 'A.B.C', methodName: 'a', argumentsNames: []}),
        ).toBe('@A/B/C.a()');
        expect(
            actionNameCreator({
                statePath: 'A.B',
                methodName: 'a',
                argumentsNames: ['x', 'y', 'z'],
            }),
        ).toBe('@A/B.a($arg0, $arg1, $arg2)');
    });

    it('should be correct create payload type by payload and name', () => {
        const registry: MethodArgsRegistry = new MethodArgsRegistry();

        registry.createPayloadType('X', 'a', 0);
        registry.createArgumentName('Z', 'a', 2);

        expect(
            actionNameCreator({
                statePath: 'A',
                methodName: 'a',
                argumentsNames: ['x', 'y', 'z'],
                argumentRegistry: registry,
            }),
        ).toBe('@A.a(X, $arg1, Z)');
    });

    it('should be correct create payload type when override type by name', () => {
        const registry: MethodArgsRegistry = new MethodArgsRegistry();

        registry.createPayloadType('X', 'a', 0);
        registry.createArgumentName('_X_', 'a', 0);
        registry.createArgumentName('Z', 'a', 2);

        expect(
            actionNameCreator({
                statePath: 'A',
                methodName: 'a',
                argumentsNames: ['x', 'y', 'z'],
                argumentRegistry: registry,
            }),
        ).toBe('@A.a(_X_, $arg1, Z)');
    });
});
