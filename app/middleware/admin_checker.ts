import { Context } from 'egg';

export = (options) => async (ctx: Context, next: () => Promise<any>) => {
    if(options.some((url) => url.test(ctx.request.url))){
        if (ctx.session.logined) {
            return await next();
        } else {
              await next();
            ctx.flash_error('403 forbidden', '你没有权限查看该页面');
            return ctx.redirect(ctx.app.config.admin.pathPrefix + '/auth');
        }
    }

    return await next()

}