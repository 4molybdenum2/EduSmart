import express from 'express';
import { login, signUp } from '../controllers/users';

const router = express.Router();
router.get('/signup', signUp);
router.get('/login', login);

export default router;