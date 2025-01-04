import { Injectable } from '@nestjs/common';
import { ServerApiVersion } from 'mongodb';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoDBService {
  async connect() {
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
  }
}
