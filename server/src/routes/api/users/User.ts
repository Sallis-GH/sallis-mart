import express from 'express'
import controller from '../../../controllers/User'

const router = express.Router()


router.post('/create', controller.createUser)
router.get('/:userID', controller.readUser)
router.get('/', controller.readAllUsers)
router.patch('/update/:userID', controller.updateUser)
router.delete('/delete/:userID', controller.deleteUser)

export = router;