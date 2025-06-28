import { Router } from 'express';
import { register, login} from '../controllers/authController';
import { authenticateJWT } from '../middleware/auth';
import { validatePasswordStrength } from '../middleware/passwordValidation';

const router = Router();

router.post('/login', (req, res, next) => {
  login(req, res).catch(next);
});

router.post('/register', validatePasswordStrength, async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;