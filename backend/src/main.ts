import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import * as Config from 'config';

async function bootstrap (config) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );
    await app.listen({
        host: config.host,
        port: config.port,
    }, (err, address) => {
        if (err) {
            Logger.error(err.message, err.stack, 'Bootstrap');
            process.exit(1);
        }
        Logger.log(`Server listening on ${address}`, 'Bootstrap');
    });
}

bootstrap(Config.get('server'));
