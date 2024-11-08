import { Router } from 'express';
import { verifyUserRequired } from '../middlewares/user.middleware';
import { authRequired } from '../middlewares/token.middleware';
import { validateSchema } from '../middlewares/validator.middleware';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';
import {
  registerUserController,
  loginUserController,
  verifyTokenController,
  getProfileUserController,
  deleteUserController,
  logoutUserController,
  sendEmailVerificationController,
  verifyEmailController,
  updateProfileUserController,
} from '../controllers/userAuth.controller';
import { upload } from '../configs/upload.config';
import { uploadToCloudinary } from '../middlewares/upload.middleware';

const userAuthRouter = Router();

userAuthRouter.post(
  '/register',
  validateSchema(registerUserSchema),
  registerUserController
);

userAuthRouter.post(
  '/login',
  validateSchema(loginUserSchema),
  loginUserController
);

userAuthRouter.get('/verify-token', verifyTokenController);

userAuthRouter.post('/logout', authRequired, logoutUserController);

userAuthRouter.get('/profile', authRequired, getProfileUserController);

userAuthRouter.delete(
  '/delete',
  authRequired,
  verifyUserRequired,
  deleteUserController
);

userAuthRouter.post(
  '/send-email-verification',
  authRequired,
  sendEmailVerificationController
);

userAuthRouter.get('/verify-email', verifyEmailController);

userAuthRouter.put(
  '/update-profile',
  authRequired,
  upload,
  uploadToCloudinary,
  verifyUserRequired,
  updateProfileUserController
);

export { userAuthRouter };
