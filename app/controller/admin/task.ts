import { Controller } from 'egg';

export default class ListController extends Controller {

    async list() {
        const tasks = await this.app.model.Task.findAll()
        return await this.ctx.render('admin/task/list', {
            tasks,
        });
    }

    async destory() {
        const { ctx, app } = this;
        const id = ctx.params.task_id;

        const task = await app.model.Task.findById(id);
        if (task) await task.destroy();

        return ctx.body = {
            type: 'success'
        }
    }

    async edit() {
        const id = this.ctx.params.task_id
        const task = await this.app.model.Task.findById(id);
        return await this.ctx.render('admin/task/edit.html', {
            task,
        });
    }

    async update() {
        const id = this.ctx.request.body.id;
        const task = await this.app.model.Task.findById(id);
        (task as any).name = this.ctx.request.body.name;
        (task as any).code = this.ctx.request.body.code;

        
        await (task as any).save();
        
        return this.ctx.body = {
            type: 'success',
            data: (task as any).toJSON()
        }

    }

}