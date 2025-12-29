import express from 'express';
import { generatePassword, savePassword, getPasswords, getPasswordById, updatePassword, deletePassword } from '../controllers/passwordController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/password/generate', generatePassword);

router.post('/password/save', requireAuth, savePassword);
router.get('/passwords', requireAuth, getPasswords);
router.get('/passwords/:id', requireAuth, getPasswordById);
router.put('/passwords/:id', requireAuth, updatePassword);
router.delete('/passwords/:id', requireAuth, deletePassword);

export default router;