"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../../../controllers/User"));
const router = express_1.default.Router();
router.post('/create', User_1.default.createUser);
router.get('/:userID', User_1.default.readUser);
router.get('/', User_1.default.readAllUsers);
router.patch('/update/:userID', User_1.default.updateUser);
router.delete('/delete/:userID', User_1.default.deleteUser);
module.exports = router;
