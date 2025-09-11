/* eslint-disable sonarjs/no-hardcoded-ip */
import {FilterUniquePipe} from '../../pipes/filter-unique/filter-unique.pipe';

describe('[TEST]: Filter Unique Pipe', (): void => {
    let filterUniquePipe: FilterUniquePipe;

    const someObjectArray = [
        {ip: '1.2.3.4', info: {username: 'a'}},
        {ip: '1.2.3.5', info: {username: 'a'}},
        {ip: '1.2.3.4', info: {username: 'b'}},
        {ip: '1.2.3.7', info: {username: 'c'}},
    ];

    const someArray = ['a', 'b', 'c', 'a', 'b'];

    beforeEach((): void => {
        filterUniquePipe = new FilterUniquePipe();
    });

    it('should correct filter unique values', (): void => {
        expect(filterUniquePipe.transform(someArray)).toEqual(['a', 'b', 'c']);
        expect(filterUniquePipe.transform(someObjectArray)).toEqual(someObjectArray);
    });

    it('should correct filter unique values by path', (): void => {
        expect(filterUniquePipe.transform(someObjectArray, 'ip')).toEqual([
            {ip: '1.2.3.4', info: {username: 'a'}},
            {ip: '1.2.3.5', info: {username: 'a'}},
            {ip: '1.2.3.7', info: {username: 'c'}},
        ]);
        expect(filterUniquePipe.transform(someObjectArray, 'info.username')).toEqual([
            {ip: '1.2.3.4', info: {username: 'a'}},
            {ip: '1.2.3.4', info: {username: 'b'}},
            {ip: '1.2.3.7', info: {username: 'c'}},
        ]);

        expect(filterUniquePipe.transform(someObjectArray, 'no.key')).toEqual([]);
    });
});
