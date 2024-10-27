import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsYearLowerOrEqualThanCurrentYear( validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsYearLowerOrEqualThanCurrentYear',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return value <= new Date().getFullYear();
                },
            },
        });
    };
}
