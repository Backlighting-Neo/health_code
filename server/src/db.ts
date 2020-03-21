import { createConnection } from 'typeorm';
import config from './config';

import { TaskEntity } from './entity/task';
import { TaskDetailEntity } from './entity/task_detail';
import { TriggerEntity } from './entity/trigger'

export const connection = () => createConnection({
  ...config.database,
  entities: [
    TaskEntity,
    TaskDetailEntity,
    TriggerEntity
  ],
});
