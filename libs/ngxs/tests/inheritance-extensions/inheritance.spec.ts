import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Immutable} from '@angular-ru/cdk/typings';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {DataAction, Persistence, StateRepository} from '@angular-ru/ngxs/decorators';
import {
    NgxsDataRepository,
    NgxsImmutableDataRepository,
} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_STORAGE_PLUGIN} from '@angular-ru/ngxs/storage';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsModule, Selector, State, Store} from '@ngxs/store';

describe('inheritance', () => {
    it('should be throw', () => {
        let message: string | null = null;

        try {
            abstract class AbstractCountRepo extends NgxsImmutableDataRepository<number> {
                // @ts-ignore
                @DataAction()
                public increment;
            }

            @Injectable()
            @StateRepository()
            @State({
                name: 'count',
                defaults: 0,
            })
            class CountState extends AbstractCountRepo {}

            TestBed.configureTestingModule({
                imports: [NgxsModule.forRoot([CountState], {developmentMode: true})],
            });
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_ACTION);
    });

    it('should be correct work with Persistence, StateRepository, Selector decorators', () => {
        @Injectable({providedIn: 'root'})
        class TodoApiService {}

        interface Todo {
            userId: number;
            id: number;
            title: string;
            completed: boolean;
        }

        class TodoStateModel {
            public todos: Todo[] = [];
            public loaded = false;
            public selectedTodo: Todo | null = null;
        }

        @Persistence([
            {
                path: 'todos',
                existingEngine: localStorage,
            },
        ])
        @StateRepository()
        @State<TodoStateModel>({
            name: 'todos',
            defaults: {
                todos: [],
                loaded: false,
                selectedTodo: null,
            },
        })
        @Injectable()
        class TodoState extends NgxsDataRepository<TodoStateModel> {
            constructor(protected readonly api: TodoApiService) {
                super();
            }

            @Selector()
            public static todos(state: TodoStateModel) {
                return state.todos;
            }

            @DataAction()
            public getTodos() {
                // ...
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([TodoState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);

        expect(store.snapshot()).toEqual({
            todos: {todos: [], loaded: false, selectedTodo: null},
        });
        expect(store.selectSnapshot(TodoState.todos)).toEqual([]);
    });

    it.skip('should be correct with inheritance', () => {
        abstract class AbstractCountRepo extends NgxsImmutableDataRepository<number> {
            @DataAction()
            public decrement(): void {
                this.ctx.setState((state: Immutable<number>) => state - 1);
            }
        }

        @Injectable()
        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        class CountState extends AbstractCountRepo {
            @DataAction()
            public increment(): void {
                this.ctx.setState((state: Immutable<number>) => state + 1);
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([CountState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const count: CountState = TestBed.inject<CountState>(CountState);

        expect(store.snapshot()).toEqual({count: 0});
        expect(count.getState()).toBe(0);

        count.increment();
        count.decrement();
        count.increment();

        expect(store.snapshot()).toEqual({count: 1});
        expect(count.getState()).toBe(1);
    });
});
