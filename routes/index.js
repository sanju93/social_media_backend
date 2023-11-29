import express from 'express';
import {Home} from '../controller/Home_Controller.js';
import { users } from './user.routes.js';
let router = express.Router();

router.get('/',Home);

router.use('/users',users);

export default router;