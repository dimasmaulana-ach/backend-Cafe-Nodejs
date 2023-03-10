const express = require('express')
const router = express.Router()

const {
    controllerGetRole,
    controllerGetRoleById,
    controllerAddRole,
    controllerUpdateRole,
    controllerDeleteRole
} = require('./role.controller')

router.get('/', controllerGetRole)
router.get('/:id', controllerGetRoleById)
router.post('/', controllerAddRole)
router.put('/:id', controllerUpdateRole)
router.delete('/:id', controllerDeleteRole)

module.exports = router