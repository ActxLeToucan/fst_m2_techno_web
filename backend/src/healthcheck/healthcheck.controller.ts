import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('healthcheck')
export class HealthcheckController {
    @ApiOkResponse({
        description: 'Healthcheck endpoint, returns OK if the service is up',
        type: String
    })
    @Get()
    healthcheck (): Observable<string> {
        return of('OK');
    }
}
