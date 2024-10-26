import { ApiProperty } from '@nestjs/swagger';

export interface AppConfig {
    host: string;
    port: number;
}

export interface OpenApiConfig {
    title: string;
    description: string;
    version: string;
    tags: string[];
    path: string;
}


export class HttpExceptionResponse {
    @ApiProperty({
        name: 'statusCode',
        description: 'HTTP status code',
        example: 400,
    })
    statusCode: number;
    @ApiProperty({
        name: 'message',
        description: 'Message(s)',
    })
    message: string[] | string;
    @ApiProperty({
        name: 'error',
        description: 'Error',
        example: 'Bad Request',
    })
    error: string;
}
