import express from 'express'
import cowsController from './cows.controller'

const router = express.Router()

router.post('/create-cow', cowsController.createCow)
router.get('/:id', cowsController.getSingleCow)
router.patch('/:id', cowsController.updateCow)
router.delete('/:id', cowsController.deleteCow)
router.get('/', cowsController.getAllCows)

export const CowsRoutes = router;
