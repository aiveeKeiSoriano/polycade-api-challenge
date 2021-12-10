import Router from 'koa-router'
import {
    getModelsList,
    createNewModel,
    getModel,
    updateModel,
    getModelPrices,
    addModelPrice,
    deleteModelPrice,
    deleteModel
} from '../controllers/pricing-models'

const router = new Router({
    prefix: '/pricing-models'
})

router
    .get('/', getModelsList)
    .post('/', createNewModel)
    .get('/:pmId', getModel)
    .put('/:pmId', updateModel)
    .delete('/:pmId', deleteModel)
    .get('/:pmId/prices', getModelPrices)
    .post('/:pmId/prices', addModelPrice)
    .delete('/:pmId/prices/:priceId', deleteModelPrice)

export default router