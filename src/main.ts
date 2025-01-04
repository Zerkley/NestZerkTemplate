import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';
import { SentryService } from './shared/services/errorLogger/errorLogger.service';
import { MongoDBService } from './shared/services/database/database.service';

// Load .env file
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sentryService = new SentryService();
  sentryService.SentryInit();

  const databaseService = new MongoDBService();
  await databaseService.connect();

  await app.listen(3000);
}
bootstrap();
