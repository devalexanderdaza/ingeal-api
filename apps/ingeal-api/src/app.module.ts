import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        // ======================================================
        // =================  API CONFIGURATION =================
        // ======================================================
        API_PORT: Joi.number().default(3000),
        API_PROTOCOL: Joi.string().required(),
        API_HOST: Joi.string().required(),
        API_URL: Joi.string().required(),
        API_DOCUMENTATION: Joi.string().required(),
        API_TIMEOUT_IN_MILLISECONDS: Joi.number().default(10000),

        // ======================================================
        // =================  API INFO ==========================
        // ======================================================
        API_NAME: Joi.string().required(),
        API_DESCRIPTION: Joi.string().required(),
        API_VERSION: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
