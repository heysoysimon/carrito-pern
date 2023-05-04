const {Router} = require('express')
const router = Router()

const{getProduct, 
    createProducto, 
    deleteProducto,
    updateProducto,
    getProductById
    } = require('../controllers/index.controller') 

router.get('/productos', getProduct)
router.post('/productos', createProducto)
router.delete('/productos/:id', deleteProducto)
router.put('/productos/:id', updateProducto)
router.get('/productos/:id', getProductById)


module.exports = router;
