const express = require('express')
const router = express.Router()
const {
    controllerGetCategory,
    controllerGetCategoryById,
    controllerAddCategory,
    controllerUpdateCategory,
    controllerDeleteCategory
} = require('./category.controller')


router.get('/',controllerGetCategory)
router.get('/:id',controllerGetCategoryById)
router.post('/',controllerAddCategory)
router.put('/:id',controllerUpdateCategory)
router.delete('/:id',controllerDeleteCategory)

module.exports = router