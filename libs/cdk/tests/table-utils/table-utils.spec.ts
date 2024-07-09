import {TestBed} from '@angular/core/testing';
import {
    PlainTableComposerModule,
    PlainTableComposerService,
} from '@angular-ru/cdk/table-utils';
import {PlainObject} from '@angular-ru/cdk/typings';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

describe('[TEST] Table utils', () => {
    let plainTableComposer: PlainTableComposerService;

    const mockWebWorker: Partial<WebWorkerThreadService> = {
        run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        },
    };

    const dataset: PlainObject[] = [
        {id: 1, firstName: 'albattani', lastName: 'herschel', age: 32, nullable: null},
        {id: 2, firstName: 'allen', lastName: 'hermann', age: 42, nullable: 'not null'},
        {
            id: 3,
            firstName: 'almeida',
            lastName: 'heisenberg',
            age: 50,
            nullable: 'not null',
        },
        {nullable: undefined, id: 4, firstName: 'antonelli', age: 19},
        {firstName: 'agnesi', id: 5, lastName: 'hawking', age: 22, nullable: null},
    ];

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [PlainTableComposerModule.forRoot()],
            providers: [{provide: WebWorkerThreadService, useValue: mockWebWorker}],
        });
        plainTableComposer = TestBed.inject(PlainTableComposerService);
    });

    it('should correctly plain sets of data without rules', async () => {
        const plain = await plainTableComposer.compose(dataset);

        expect(plain).toEqual([
            {
                id: 1,
                firstName: 'albattani',
                lastName: 'herschel',
                age: 32,
                nullable: null,
            },
            {
                id: 2,
                firstName: 'allen',
                lastName: 'hermann',
                age: 42,
                nullable: 'not null',
            },
            {
                id: 3,
                firstName: 'almeida',
                lastName: 'heisenberg',
                age: 50,
                nullable: 'not null',
            },
            {
                id: 4,
                firstName: 'antonelli',
                lastName: undefined,
                age: 19,
                nullable: undefined,
            },
            {id: 5, firstName: 'agnesi', lastName: 'hawking', age: 22, nullable: null},
        ]);
        expect(plain.map((element: PlainObject) => Object.keys(element))).toEqual(
            new Array(5).fill(['id', 'firstName', 'lastName', 'age', 'nullable']),
        );

        await expect(plainTableComposer.compose([])).resolves.toEqual([]);
    });

    it('should correctly plain sets of data with include rule', async () => {
        let plain: PlainObject[] = await plainTableComposer.compose(dataset, {
            includeKeys: ['id', 'lastName'],
        });

        expect(plain).toEqual([
            {id: 1, lastName: 'herschel'},
            {id: 2, lastName: 'hermann'},
            {id: 3, lastName: 'heisenberg'},
            {id: 4, lastName: undefined},
            {id: 5, lastName: 'hawking'},
        ]);
        expect(plain.map((element) => Object.keys(element))).toEqual(
            new Array(5).fill(['id', 'lastName']),
        );

        plain = await plainTableComposer.compose(dataset, {
            includeKeys: ['firstName', 'id', 'lastName', 'country'],
        });
        expect(plain).toEqual([
            {firstName: 'albattani', id: 1, lastName: 'herschel', country: undefined},
            {firstName: 'allen', id: 2, lastName: 'hermann', country: undefined},
            {firstName: 'almeida', id: 3, lastName: 'heisenberg', country: undefined},
            {firstName: 'antonelli', id: 4, lastName: undefined, country: undefined},
            {firstName: 'agnesi', id: 5, lastName: 'hawking', country: undefined},
        ]);
        expect(plain.map((element) => Object.keys(element))).toEqual(
            new Array(5).fill(['firstName', 'id', 'lastName', 'country']),
        );
    });

    it('should correctly plain sets of data with exclude rule', async () => {
        let plain: PlainObject[] = await plainTableComposer.compose(dataset, {
            excludeKeys: ['id', 'firstName'],
        });

        expect(plain).toEqual([
            {lastName: 'herschel', age: 32, nullable: null},
            {lastName: 'hermann', age: 42, nullable: 'not null'},
            {lastName: 'heisenberg', age: 50, nullable: 'not null'},
            {lastName: undefined, age: 19, nullable: undefined},
            {lastName: 'hawking', age: 22, nullable: null},
        ]);
        expect(plain.map((element) => Object.keys(element))).toEqual(
            new Array(5).fill(['lastName', 'age', 'nullable']),
        );

        plain = await plainTableComposer.compose(dataset, {
            excludeKeys: ['age', 'firstName', 'country'],
        });
        expect(plain).toEqual([
            {id: 1, lastName: 'herschel', nullable: null},
            {id: 2, lastName: 'hermann', nullable: 'not null'},
            {id: 3, lastName: 'heisenberg', nullable: 'not null'},
            {id: 4, lastName: undefined, nullable: undefined},
            {id: 5, lastName: 'hawking', nullable: null},
        ]);
        expect(plain.map((element) => Object.keys(element))).toEqual(
            new Array(5).fill(['id', 'lastName', 'nullable']),
        );
    });
});
