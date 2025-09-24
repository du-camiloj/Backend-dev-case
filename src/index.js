require('dotenv').config();
const express = require('express');
const { getGraphQLParameters, processRequest, renderGraphiQL, shouldRenderGraphiQL } = require('graphql-helix');
const schema = require('./interfaces/graphql/schema');
const logger = require('./interfaces/logger');
const db = require('./infrastructure/db/sequelize');
// const { schedule } = require('./infrastructure/cron/refresh');

const app = express();
app.use(express.json());
app.use(logger);

app.get('/', (_, res) => res.json({ ok: true }));

// GraphQL endpoint
app.use('/graphql', async (req, res) => {
  if (shouldRenderGraphiQL(req)) {
    res.send(renderGraphiQL({ endpoint: '/graphql' }));
    return;
  }
  const request = { body: req.body, headers: req.headers, method: req.method, query: req.query };
  const { operationName, query, variables } = getGraphQLParameters(request);

  const result = await processRequest({
    operationName, query, variables, request,
    schema,
    contextFactory: () => ({})
  });

  if (result.type === 'RESPONSE') {
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status).json(result.payload);
  } else if (result.type === 'MULTIPART_RESPONSE') {
    res.writeHead(200, { Connection: 'keep-alive', 'Content-Type': 'multipart/mixed; boundary=' + result.boundary });
    for await (const part of result.result) {
      const chunk = Buffer.from(part, 'utf8');
      res.write(chunk);
    }
    res.end();
  } else {
    res.writeHead(200, result.headers);
    for await (const chunk of result.result) res.write(chunk);
    res.end();
  }
});

const { PORT = 3030 } = process.env;
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('\nDB connected');
    // schedule();
    app.listen(PORT, () => console.log(
      `API ready -> http://localhost:${PORT}/ \nGraphQL -> http://localhost:${PORT}/graphql\n`
    ));
  } catch (e) {
    console.error('Startup error:', e);
    process.exit(1);
  }
})();
