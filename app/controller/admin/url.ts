import { Controller } from 'egg';

export default class UrlController extends Controller {
    async index(){
        const q = this.ctx.query['q'];
        const config: any = {
            include: [
                { model: this.app.model.Task }
            ],
            order: [
                ['updated_at', 'desc']
            ]
        };

        if(q) {
            config.where = {
                status: q
            };
        }

        const urls = await this.app.model.UrlQueue.findAll(config);
        return await this.ctx.render('admin/url_queue/index', {
            urls,
        });
    }
    
    async new () {
        const tasks = await this.app.model.Task.findAll();
        return await this.ctx.render('admin/url_queue/create', {
            tasks,
        });
    }

    async create() {
        const url = this.ctx.request.body['url'];
        const task_id = this.ctx.request.body['task_id']
        const model = await this.app.model.UrlQueue.create({
            url,
            error_message: '',
            status: "queue"
        });
        const task = await this.app.model.Task.findById(task_id);
        (model as any).setTask(task);
        await model.save();
        this.ctx.flash_success('成功', '创建 URL 成功');
        return this.ctx.redirect(this.ctx.request.url);
    }

    async destroy() {
        const id = this.ctx.params.id;
        await this.app.model.UrlQueue.destroy({
            where: {
                id
            }
        })

        this.ctx.flash_success('成功', '删除 URL 成功');
        return this.ctx.redirect(this.ctx.request.url + '/..');
    }

    async edit() {
        const tasks = await this.app.model.Task.findAll();
        const id = this.ctx.params.id;
        const url = await this.app.model.UrlQueue.findById(id);
        return await this.ctx.render('admin/url_queue/edit', {
            tasks,
            url
        });
    }

    async update() {
        const id = this.ctx.params.id;
        const url = this.ctx.request.body['url'];
        const task_id = this.ctx.request.body['task_id'];
        const model = await this.app.model.UrlQueue.findById(id);
        (model as any).url = url;
        (model as any).task_id = task_id;
        await (model as any).save();
        this.ctx.flash_success("成功", "修改数据成功");
        return this.ctx.redirect(this.ctx.request.url)
    }

    run(){
        this.ctx.service.run.start()
        return this.ctx.body = {
            type: 'success'
        };
    }

    stop(){
        this.ctx.service.run.stop();
        return this.ctx.body = {
            type: 'success'
        };
    }


}