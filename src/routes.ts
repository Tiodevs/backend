import { Request, Response, Router } from 'express'
import multer from 'multer'

// Middlewares
import uploadConfig from './config/multer'
import { isAuthenticated } from './middlewares/isAuthenticated'

// Controllers
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'
import { RemoveProductController } from './controllers/product/RemoveProductController'

const router = Router()

// Configuração do envio de arquivos
const upload = multer(uploadConfig.upload("./tmp"))

router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API FoodSysten!!! 🍕
    <h1>
  `)
})

// Rotas Users
router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY --
router.post('/categories', isAuthenticated, new CreateCategoryController().handle)
router.get('/categories', isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT --
// router.post('/products',
//   isAuthenticated,
//   upload.single('file'),
//   new CreateProductController().handle
// )
router.post('/products',
  isAuthenticated,
  new CreateProductController().handle
)

router.get('/categories/products', isAuthenticated, new ListByCategoryController().handle)
router.delete('/categories/products', isAuthenticated, new RemoveProductController().handle)

// -- ROTAS ORDER --
router.post('/orders', isAuthenticated, new CreateOrderController().handle)
router.delete('/orders', isAuthenticated, new RemoveOrderController().handle)

router.post('/orders/add', isAuthenticated, new AddItemController().handle)
router.delete('/orders/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/orders/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/orders/details', isAuthenticated, new DetailOrderController().handle)
router.put('/orders/finish', isAuthenticated, new FinishOrderController().handle)

export { router }