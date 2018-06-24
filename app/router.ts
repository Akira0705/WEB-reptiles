import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.redirect('/', '/news');
  router.get('/news', controller.news.list);
  router.get('/news/item/:id', controller.news.detail);
  router.get('/news/user/:id', controller.news.user);

  const adminPrefix = app.config.admin.pathPrefix;
  app.get(adminPrefix + '/home', controller.admin.home);
  app.get(adminPrefix + '/exit', controller.admin.exit);

  app.get(adminPrefix + '/auth', controller.admin.auth);
  app.post(adminPrefix + '/auth', controller.admin.authCheck);

  app.get(adminPrefix + '/task/create', controller.admin.TaskCreate);
  app.post(adminPrefix + '/task/create', controller.admin.TaskCreatePost);

  app.get(adminPrefix + '/task/list', controller.admin.task.list);
  app.delete(adminPrefix + '/task/:task_id', controller.admin.task.destory);
  app.get(adminPrefix + '/task/:task_id/edit', controller.admin.task.edit);
  app.put(adminPrefix + '/task/:task_id/edit', controller.admin.task.update);

  app.resources('adminUrls', adminPrefix + '/url', 'admin.url');

  app.get(adminPrefix + '/qrun', controller.admin.url.run);
  app.get(adminPrefix + '/qstop', controller.admin.url.stop);

};

