import { Application } from 'egg';
import { Instance } from 'sequelize';

type status = 'success' | 'error' | 'wating' | 'queue';

export interface UrlQueueAttributes {
  status: status;
  url: string;
  error_message: string;
}

export interface UrlQueueInstance extends Instance < UrlQueueAttributes >, UrlQueueAttributes {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default (app: Application) => {

  const { STRING, TEXT, ENUM } = app.Sequelize;

  const urlQueue = app.model.define< UrlQueueInstance, UrlQueueAttributes >('url_queue', {
    url: STRING(255),
    error_message: TEXT,
    status: ENUM(['success', 'error', 'wating', 'queue']),
  });

  urlQueue.associate = () => {
    urlQueue.belongsTo(app.model.Task);
  };

  return urlQueue;
};