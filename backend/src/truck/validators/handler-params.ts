import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class HandlerParams {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]{2}[0-9]{3}[A-Z]{2}$/, { message: 'Invalid truck registration number' })
    id: string;
}
