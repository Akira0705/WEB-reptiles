import NewsController from './news';
import AdminController from './admin';
import TaskController from './admin/task'
import UrlController from './admin/url';

import { Request } from 'egg'

declare module 'egg' {
  export interface IController {
    news: NewsController;
    admin: AdminController & {
      task: TaskController,
      url: UrlController
    };
  }
}