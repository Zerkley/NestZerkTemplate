import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

// Load .env file
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: 'https://7f4d8f8e73beef9f02a6a914ee1740ac@o4508376972132352.ingest.de.sentry.io/4508507876884560',
      integrations: [nodeProfilingIntegration()],
      // Tracing
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
    });
  }

  const client = new MongoClient(process.env.MONGO_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db('admin').command({ ping: 1 });
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!',
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  await app.listen(3000);
}
bootstrap();
