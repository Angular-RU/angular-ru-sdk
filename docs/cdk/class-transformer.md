#### `@angular-ru/cdk/class-transformer`

```typescript
import {
  ONLY_TO_CLASS,
  transformAsPrepareFieldsFromClass,
  transformParseFloat,
  transformParseInt,
  transformToBoolean,
  transformToClass,
  transformToFormatDateTime,
  transformToNullableBoolean,
  transformToNumber,
  transformToPrettyFormat,
  transformToStringVal,
  transformToTrim,
  transformToUnix,
  transformDateToFormat,
} from '@angular-ru/cdk/class-transformer';

describe('[TEST]: Integration with class-transformer', () => {
  @Exclude()
  class IsoDto {
    @Expose() @Transform(transformToNumber, ONLY_TO_CLASS) public a?: string;
    @Expose() @Transform(transformToNumber, ONLY_TO_CLASS) public b?: string;
  }

  @Exclude()
  class DemoDto {
    @Expose() @Transform(transformToFormatDateTime, ONLY_TO_CLASS) public startDate?: number;
    @Expose() @Transform(transformToUnix, ONLY_TO_CLASS) public endDate?: string;
    @Expose() @Transform(transformToTrim, ONLY_TO_CLASS) public comment?: string;
    @Expose() @Transform(transformToPrettyFormat, ONLY_TO_CLASS) public lastChanged?: number;
    @Expose() @Transform(transformToStringVal, ONLY_TO_CLASS) public enabled?: boolean;
    @Expose() @Transform(transformParseFloat, ONLY_TO_CLASS) public floatVal?: number;
    @Expose() @Transform(transformParseInt, ONLY_TO_CLASS) public intVal?: number;
    @Expose() @Transform(transformToNumber, ONLY_TO_CLASS) public numVal?: string;
    @Expose() @Transform(transformToBoolean, ONLY_TO_CLASS) public checked?: boolean;
    @Expose() @Transform(transformToNullableBoolean, ONLY_TO_CLASS) public checkedNullable?: Nullable<boolean>;

    @Expose()
    @Type(transformToClass(IsoDto))
    @Transform(transformAsPrepareFieldsFromClass(IsoDto), ONLY_TO_CLASS)
    public iso?: IsoDto;

    @Expose()
    @Transform(transformDateToFormat({format: 'dd.MM.yyyy', timezone: 'GMT+03:00'}), ONLY_TO_CLASS)
    public dateCustomFormatWithTimezone?: number;
    @Expose()
    @Transform(transformDateToFormat({format: 'dd.MM.yyyy HH:mm', timezone: 'GMT+06:00'}), ONLY_TO_CLASS)
    public datetimeCustomFormatWithTimezone?: number;
    @Expose()
    @Transform(transformDateToFormat({format: 'dd.MM.yyyy'}), ONLY_TO_CLASS)
    public dateCustomFormatWithoutTimezone?: number;
    @Expose() @Transform(transformDateToFormat(), ONLY_TO_CLASS) public dateCustomFormatEmptyOptions?: number;
  }

  it('should be correct use @Transform', () => {
    expect(
      plainToClass(DemoDto, {
        startDate: 757803600000,
        endDate: '01.06.1994',
        comment: '   Hello World   ',
        lastChanged: 757803600000,
        enabled: false,
        floatVal: 123.25,
        intVal: 11.5,
        numVal: '1234',
        iso: {
          a: ' 2 ',
          b: ' 3 ',
          c: false,
        },
        checked: undefined,
        checkedNullable: undefined,
        dateCustomFormatWithTimezone: 1622657925000,
        datetimeCustomFormatWithTimezone: 1622657925000,
        dateCustomFormatWithoutTimezone: 1622657925000,
        dateCustomFormatEmptyOptions: 1622657925000,
      } as DemoDto),
    ).toEqual({
      startDate: '06.01.1994 00:00:00',
      endDate: 757803600000,
      comment: 'Hello World',
      lastChanged: '06.01.1994 00:00:00',
      enabled: 'false',
      floatVal: 123.25,
      intVal: 11,
      numVal: 1234,
      iso: {a: 2, b: 3},
      checked: false,
      checkedNullable: null,
      dateCustomFormatWithTimezone: '02.06.2021',
      datetimeCustomFormatWithTimezone: '03.06.2021 00:18',
      dateCustomFormatWithoutTimezone: expect.any(String),
      dateCustomFormatEmptyOptions: expect.any(String),
    });
  });

  it('should be invalid transform to number as NaN', (): void => {
    const actual: DemoDto = new DemoDto();
    actual.numVal = 'INVALID NUMBER';
    expect(actual.numVal).toEqual('INVALID NUMBER');
    expect(plainToClass(DemoDto, actual).numVal).toEqual(NaN);
  });

  it('should be correct transform to number', (): void => {
    const actual: DemoDto = new DemoDto();
    actual.numVal = ' 100 ';
    expect(actual.numVal).toEqual(' 100 ');
    expect(plainToClass(DemoDto, actual).numVal).toEqual(100);
  });
});
```
