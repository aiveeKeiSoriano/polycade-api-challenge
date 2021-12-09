import Router from 'koa-router'
import {
    getModelsList,
    createNewModel,
    getModel,
    updateModel,
    getModelPrices,
    addModelPrice,
    deleteModelPrice,
    addDummyData
} from '../controllers/pricing-models'

const router = new Router({
    prefix: '/pricing-models'
})

router
    .get('/add', addDummyData)
    .get('/', getModelsList)
    .post('/', createNewModel)
    .get('/:pmId', getModel)
    .put('/:pmId', updateModel)
    .get('/:pmId/prices', getModelPrices)
    .post('/:pmId/prices', addModelPrice)
    .delete('/:pmId/prices/:priceId', deleteModelPrice)

export default router