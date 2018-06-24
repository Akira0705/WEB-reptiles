import { Application } from 'egg';
import { Instance } from 'sequelize';

export interface TaskAttributes {
  name: string;
  code: string;
}

export interface TaskInstance extends Instance<TaskAttributes>, TaskAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export default (app: Application) => {

  const { STRING, TEXT } = app.Sequelize;

  const task = app.model.define<TaskInstance, TaskAttributes>('task', {
    name: STRING(60),
    code: TEXT,
  });

  task.associate = () => {
    task.hasMany(app.model.UrlQueue);
  };

  return task;
};