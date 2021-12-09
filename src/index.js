import env from 'dotenv'
env.config()

import Koa from 'koa'
import { sequelize } from './db'
import bodyParser from 'koa-bodyparser'

export const app = new Koa()
const PORT = process.env.PORT || 1337

try {
  sequelize.authenticate().then(() =>
    console.log('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// sequelize.sync({ force: true })

import pricingModelsRouter from './routes/pricing-models'
import machinesRouter from './routes/machines'

app.use(bodyParser(
  {
    detectJSON: function (ctx) {
      return /\.json$/i.test(ctx.path);
    }
  }))

app
  .use(pricingModelsRouter.routes())
  .use(machinesRouter.routes())
  .on('error', (err, ctx) => {
    ctx.response.body = err
  });

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  )
}

