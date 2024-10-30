// middlewares.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { FRONTEND_URL } from '../configs/envConfig';
import { Application } from 'express';

const applyMiddlewares = (app: Application) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
    })
  );
  app.use(morgan('dev'));
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: './uploads/',
    })
  );
};

export { applyMiddlewares };
