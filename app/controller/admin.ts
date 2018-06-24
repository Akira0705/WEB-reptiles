import { Controller } from 'egg';

export default class AdminController extends Controller {
    async home() {
        return await this.ctx.render('admin/home', {});
    }
    async auth() {
        return this.ctx.render('admin/auth', {});
    }

    async authCheck() {
        const { ctx, app } = this;
        const body = ctx.request.body;
        if (app.config.admin.password == body['password'] && app.config.admin.username == body['username']) { // tslint:disable-line
            ctx.session.logined = true;
            return ctx.redirect(app.config.admin.pathPrefix + '/url');
        }
        ctx.flash_error('登陆失败', '用户名或者密码不正确');
        return ctx.redirect(app.config.admin.pathPrefix + '/auth');
    }

    async exit() {
        const { ctx, app } = this;
        ctx.session.logined = false
        ctx.flash_success('成功', '用户已经注销')
        return ctx.redirect(app.config.admin.pathPrefix + '/auth')
    }

     async TaskCreate(){
        return await this.ctx.render('admin/task/create');
    }

    async TaskCreatePost(){
        const { ctx, app } = this;
        const { name, code } = (ctx.request.body as any);
        if (!(name && code)) {
            ctx.body = {
                msg: 'name 和 code 都是必须的',
                type: 'error',
            };
            return ;
        };

        console.log("爬取逻辑：----------------");
        console.log(code);
        console.log("-------------------------");
        // new Function("app", code)(app)

        console.log(name, code)

        const task = await app.model.Task.create({
            name,
            code
        });

        return ctx.body = {
            type: 'success',
            data: task.toJSON()
        };
        
        

    }

}