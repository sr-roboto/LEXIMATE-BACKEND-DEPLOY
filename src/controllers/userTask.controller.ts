// import { deleteFromCloudinary } from '../middlewares/upload.middleware';
import { logger } from '../configs/logger.config';
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getTasksByClassService,
  getTaskService,
} from '../services/userTask.service';
import { Request, Response } from 'express';

const createTaskController = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.classId);

    if (!classId) {
      res.status(400).json({ error: 'Falta el id de la clase' });
      return;
    }

    const taskData = req.body;

    if (!taskData) {
      res.status(400).json({ error: 'Falta la información de la tarea' });
      return;
    }

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    let fileUrl = undefined;
    let fileId = undefined;
    let fileType = undefined;

    if (req.file) {
      try {
        fileUrl = req.file.cloudinaryUrl;
        fileId = req.file.cloudinaryPublicId;
        fileType = req.file.mimetype;
      } catch (error) {
        logger.error(error, 'Error al subir archivo a Cloudinary');
        res.status(400).json({ error: 'Error al subir archivo a Cloudinary' });
        return;
      }
    }

    const fileProps = {
      fileUrl: fileUrl || '',
      fileId: fileId || '',
      fileType: fileType || '',
    };

    const newTask = await createTaskService(
      classId,
      userId,
      taskData,
      fileProps
    );

    if (!newTask) {
      res.status(404).json({ error: 'No se pudo crear la tarea' });
      return;
    }

    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error, 'Error en createTaskController');
      res.status(400).json({ error: error.message });
    } else {
      logger.error(error, 'Error desconocido en createTaskController');
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

const updateTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    const taskId = parseInt(req.params.taskId);

    if (!taskId) {
      res.status(400).json({ error: 'Falta el id de la tarea' });
      return;
    }

    const taskData = req.body;

    if (!taskData) {
      res.status(400).json({ error: 'Falta la información de la tarea' });
      return;
    }

    let fileUrl = undefined;
    let fileId = undefined;
    let fileType = undefined;

    if (req.file && req.file.cloudinaryUrl) {
      fileUrl = req.file.cloudinaryUrl;
      fileId = req.file.cloudinaryPublicId;
      fileType = req.file.mimetype;
    }

    const fileProps = {
      fileUrl: fileUrl || '',
      fileId: fileId || '',
      fileType: fileType || '',
    };

    const updatedTask = await updateTaskService(
      userId,
      taskId,
      taskData,
      fileProps
    );

    if (!updatedTask) {
      res.status(404).json({ error: 'Tarea no encontrada' });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error, 'Error en updateTaskController');
      res.status(400).json({ error: error.message });
    } else {
      logger.error(error, 'Error desconocido en updateTaskController');
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.taskId);

    if (!taskId) {
      res.status(400).json({ error: 'Falta el id de la tarea' });
      return;
    }

    const classId = parseInt(req.params.classId);

    if (!classId) {
      res.status(400).json({ error: 'Falta el id de la clase' });
      return;
    }

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    const task = await deleteTaskService(taskId, classId, userId);

    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' });
      return;
    }

    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error, 'Error en deleteTaskController');
      res.status(400).json({ error: error.message });
    } else {
      logger.error(error, 'Error desconocido en deleteTaskController');
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

const getTasksByClassController = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.classId);

    if (!classId) {
      res.status(400).json({ error: 'Falta el id de la clase' });
      return;
    }

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    const tasks = await getTasksByClassService(classId, userId);

    if (!tasks) {
      res.status(404).json({ error: 'No se encontraron tareas' });
      return;
    }

    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error, 'Error en getTasksByClassController');
      res.status(400).json({ error: error.message });
    } else {
      logger.error(error, 'Error desconocido en getTasksByClassController');
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

const getTaskController = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.taskId);

    if (!taskId) {
      res.status(400).json({ error: 'Falta el id de la tarea' });
      return;
    }

    const classId = parseInt(req.params.classId);

    if (!classId) {
      res.status(400).json({ error: 'Falta el id de la clase' });
      return;
    }

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    const task = await getTaskService(taskId, classId, userId);

    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error, 'Error en getTaskController');
      res.status(400).json({ error: error.message });
    } else {
      logger.error(error, 'Error desconocido en getTaskController');
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

export {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTasksByClassController,
  getTaskController,
};
