import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { AppConfig } from './app.types';

async function bootstrap (config: AppConfig) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    // enable validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    // launch server
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

bootstrap(Config.get<AppConfig>('server'));
