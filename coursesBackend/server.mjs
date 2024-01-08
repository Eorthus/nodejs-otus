// Import the framework and instantiate it
import Fastify from 'fastify'
import Certificate from 'fastify-tls-keygen'

const fastify = Fastify({
  logger: true,
  https: true,
})
  

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.register(Certificate)
  fastify.listen({ port: 3000})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}