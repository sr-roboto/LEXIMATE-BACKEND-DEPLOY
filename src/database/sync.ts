import { People } from '../models/people.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { RolePermission } from '../models/rolePermission.model';
import { Class } from '../models/class.model';
import { Task } from '../models/task.model';
import { UserClass } from '../models/userClass.model';
import { FileTask } from '../models/fileTask.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Tool } from '../models/tool.model';
import { TaskTool } from '../models/taskTool.model';
import { logger } from '../configs/loggerConfig';
import './relationship';

const syncModels = async () => {
  try {
    await People.sync({ force: false });
    await User.sync({ force: false });
    await Role.sync({ force: false });
    await Permission.sync({ force: false });
    await RolePermission.sync({ force: false });
    await Class.sync({ force: false });
    await Task.sync({ force: false });
    await UserClass.sync({ force: false });
    await FileTask.sync({ force: false });
    await Post.sync({ force: false });
    await Comment.sync({ force: false });
    await Tool.sync({ force: false });
    await TaskTool.sync({ force: false });

    logger.info('Modelos sincronizados correctamente.');
  } catch (error) {
    logger.error('Error al sincronizar los modelos:', error);
  }
};

export { syncModels };
