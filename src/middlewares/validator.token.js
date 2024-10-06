import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/envConfig.js';
import { logger } from '../configs/loggerConfig.js';

const authRequired = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: ['No autorizado'] });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    logger.child({ error }).error('Error en authRequired');
    return res.status(401).json({ error: ['Token inválido'] });
  }
};

export { authRequired };
