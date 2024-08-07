import {Injectable} from '@angular/core';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {ngxsTestingPlatform} from '@angular-ru/ngxs/testing';
import {State} from '@ngxs/store';

describe('[TEST]: Entity observables', () => {
    describe('entityArray$', () => {
        interface StudentEntity {
            id: number;
            name: string;
        }

        @StateRepository()
        @State({
            name: 'student',
            defaults: createEntityCollections(),
        })
        @Injectable()
        class StudentEntitiesState extends NgxsDataEntityCollectionsRepository<
            StudentEntity,
            string
        > {}

        it(
            'correct create entity arrays',
            ngxsTestingPlatform([StudentEntitiesState], (_store, studentEntities) => {
                const entityArrayEvents: StudentEntity[][] = [];

                studentEntities.entitiesArray$.subscribe((entities) => {
                    entityArrayEvents.push(entities);
                });

                studentEntities.setAll([
                    {
                        id: 1,
                        name: 'Maxim',
                    },
                    {
                        id: 2,
                        name: 'Ivan',
                    },
                    {
                        id: 3,
                        name: 'Nikola',
                    },
                    {
                        id: 4,
                        name: 'Petr',
                    },
                ]);

                studentEntities.reset();

                studentEntities.addOne({
                    id: 1,
                    name: 'Maxim',
                });

                studentEntities.removeAll();

                const entity: StudentEntity = {
                    id: 4,
                    name: 'Mark',
                };

                studentEntities.upsertOne(entity);

                studentEntities.removeByEntity(entity);

                expect(entityArrayEvents).toEqual([
                    [],
                    [
                        {
                            id: 1,
                            name: 'Maxim',
                        },
                        {
                            id: 2,
                            name: 'Ivan',
                        },
                        {
                            id: 3,
                            name: 'Nikola',
                        },
                        {
                            id: 4,
                            name: 'Petr',
                        },
                    ],
                    [],
                    [
                        {
                            id: 1,
                            name: 'Maxim',
                        },
                    ],
                    [],
                    [
                        {
                            id: 4,
                            name: 'Mark',
                        },
                    ],
                    [],
                ]);
            }),
        );
    });
});
