import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Injectable,
    OnInit,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {provideStore, Select, State, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

describe('check correct deep instance', () => {
    let component: AppComponent;
    let store: Store;
    let fixture: ComponentFixture<AppComponent>;

    interface IFormState {
        dirty?: boolean;
        model: any;
    }

    class FormState {
        public dirty?: boolean = false;
        public model: any = undefined;
    }

    interface IRegistrationStateModel {
        address: IFormState;
    }

    class RegistrationStateModel {
        public address: FormState = new FormState();
    }

    @StateRepository()
    @State<IRegistrationStateModel>({
        name: 'registration',
        defaults: new RegistrationStateModel(),
    })
    @Injectable()
    class RegistrationState extends NgxsImmutableDataRepository<IRegistrationStateModel> {
        @Select((state: any) => state.registration)
        public address$!: Observable<IFormState>;

        @DataAction()
        public addAddress(address: IFormState): any {
            return this.ctx.setState(() => ({address}));
        }
    }

    @Component({
        selector: 'my-app',
        template: '',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class AppComponent implements OnInit {
        private readonly registration = inject(RegistrationState);

        public name = 'Angular + NGXS';
        public result: any = null;

        public ngOnInit() {
            this.result = this.registration.addAddress({
                dirty: true,
                model: {hello: 'world'},
            });
        }
    }

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideStore([RegistrationState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
    });

    it('should be correct ngOnInit', () => {
        expect(component.name).toBe('Angular + NGXS');
        expect(store.snapshot()).toEqual({registration: {address: {dirty: false}}});

        component.ngOnInit();

        expect(store.snapshot()).toEqual({
            registration: {address: {dirty: true, model: {hello: 'world'}}},
        });
        expect(component.result).toBeUndefined();
    });
});
