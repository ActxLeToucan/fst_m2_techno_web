import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { AppConfig, OpenApiConfig } from './app.types';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { TruckModule } from './truck/truck.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap (config: AppConfig, corsConfig: CorsOptions, openApiConfig: OpenApiConfig) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    app.enableCors(corsConfig);

    // enable validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    // openapi
    const truckManagerDoc = SwaggerModule.createDocument(app, openApiOptions(openApiConfig), {
        include: [
            HealthcheckModule,
            TruckModule
        ],
    });
    SwaggerModule.setup(openApiConfig.path, app, truckManagerDoc);

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

bootstrap(
    Config.get<AppConfig>('server'),
    Config.get<CorsOptions>('cors'),
    Config.get<OpenApiConfig>('openapi')
);

function openApiOptions (config: OpenApiConfig): Omit<OpenAPIObject, 'paths'> {
    const documentBuilder = new DocumentBuilder()
        .setTitle(config.title)
        .setDescription(config.description)
        .setVersion(config.version);
    config.tags.forEach(tag => documentBuilder.addTag(tag));
    return documentBuilder.build();
}
