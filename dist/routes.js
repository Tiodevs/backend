"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// Middlewares
const multer_2 = __importDefault(require("./config/multer"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// Controllers
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const RemoveProductController_1 = require("./controllers/product/RemoveProductController");
const router = (0, express_1.Router)();
exports.router = router;
// Configuração do envio de arquivos
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
router.get('/', (req, res) => {
    return res.send(`
    <h1 style='font-family: sans-serif'>
        API FoodSysten!!! 🍕
    <h1>
  `);
});
// Rotas Users
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/login', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// -- ROTAS CATEGORY --
router.post('/categories', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/categories', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// -- ROTAS PRODUCT --
// router.post('/products',
//   isAuthenticated,
//   upload.single('file'),
//   new CreateProductController().handle
// )
router.post('/products', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/categories/products', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
router.delete('/categories/products', isAuthenticated_1.isAuthenticated, new RemoveProductController_1.RemoveProductController().handle);
// -- ROTAS ORDER --
router.post('/orders', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/orders', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/orders/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete('/orders/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put('/orders/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
router.get('/orders/details', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put('/orders/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
