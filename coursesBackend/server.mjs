import Fastify from 'fastify'
import Certificate from 'fastify-tls-keygen'
import { MongoClient } from "mongodb";

const dbUrl = 'mongodb://localhost:27017';

const client = new MongoClient(dbUrl);

const fastify = Fastify({
  logger: true,
  https: true,
})


// Declare a route
fastify.get('/', async function handler (request, reply) {
  const db = client.db('courses');
  const collection = db.collection('courses');
  const findResult = await collection.find({}).toArray();
  return { hello: findResult }
})

// Run the server!
try {
  await fastify.register(Certificate)

  client.connect();

  fastify.listen({ port: 3000})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}