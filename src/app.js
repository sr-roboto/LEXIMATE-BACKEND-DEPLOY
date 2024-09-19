import express from 'express';
import { teacherAuthRouter } from './routes/teacherAuth.routes.js';
import { studentAuthRouter } from './routes/studentAuth.routes.js';
import { taskRouter } from './routes/tasks.routes.js';
import { applyMiddlewares } from './middlewares/app.middlewares.js';
import { userRouter } from './routes/userAuth.routes.js';

//init app
const app = express();

//middlewares
applyMiddlewares(app);

//routes
// app.use('/api/auth', authRouter);
app.use('/api/teacher/auth', teacherAuthRouter);
app.use('/api/student/auth', studentAuthRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/auth', userRouter);

export { app };
