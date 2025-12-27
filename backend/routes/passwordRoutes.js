import express from 'express';
import { generatePassword, savePassword, getPasswords, getPasswordById, updatePassword, deletePassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/password/generate', generatePassword);
router.post('/password/save', savePassword);
router.get('/passwords', getPasswords);
router.get('/passwords/:id', getPasswordById);
router.put('/passwords/:id', updatePassword);
router.delete('/passwords/:id', deletePassword);

export default router;