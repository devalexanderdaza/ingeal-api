import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@app/common/filters';
import {
  ResponseInterceptor,
  TimeOutInterceptor,
} from '@app/common/interceptors';
import { SwaggerUtil, validationOptions } from '@app/common';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  // Create a NestJS application
  const app: INestApplication = await NestFactory.create(AppModule);

  // Enable class-validator to use Nest's container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Enable shutdown hooks
  app.enableShutdownHooks();

  // Get configuration service
  const configuration: ConfigService = app.get(ConfigService);

  // Configure global filters, interceptors and pipes
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeOutInterceptor(
      configuration.getOrThrow<number>('API_TIMEOUT_IN_MILLISECONDS'),
    ),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // Configure Swagger
  new SwaggerUtil(
    app,
    configuration.getOrThrow<string>('API_NAME'),
    configuration.getOrThrow<string>('API_DESCRIPTION'),
    configuration.getOrThrow<string>('API_VERSION'),
    configuration.getOrThrow<string>('API_DOCUMENTATION'),
  ).configure();

  // Start the application
  await app.listen(configuration.getOrThrow<number>('API_PORT'), () => {
    Logger.debug(
      `API is running on ${configuration.getOrThrow<string>(
        'API_PROTOCOL',
      )}://${configuration.getOrThrow<string>(
        'API_HOST',
      )}:${configuration.getOrThrow<number>('API_PORT')}`,
      'Bootstrap',
    );

    Logger.debug(
      `API documentation is available on ${configuration.getOrThrow<string>(
        'API_PROTOCOL',
      )}://${configuration.getOrThrow<string>(
        'API_HOST',
      )}:${configuration.getOrThrow<number>(
        'API_PORT',
      )}/${configuration.getOrThrow<string>('API_DOCUMENTATION')}`,
      'Bootstrap',
    );
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
