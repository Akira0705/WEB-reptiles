import { Context, Service } from 'egg';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

let canRun = true;

export default class Run extends Service{
    public timer: any;
    constructor(ctx: Context) {
        super(ctx);
    }

    public run() {
        this.timer = setTimeout(async () => {
            try{
                await this.next()
            }catch(e){
                clearTimeout(this.timer)
                return;
            }
            if(canRun){
                this.run();
            }else{
                clearTimeout(this.timer)
                return;
            }
        }, 0);
    };

    public start(){
        canRun = true;
        this.run()
    }

    public stop() {
        canRun = false;
    }

    public async next(){
        const { ctx, app } = this;
        const queue = await app.model.UrlQueue.findOne({
            where: {
                status: "queue"
            },
            include: [
                { model: app.model.Task }
            ]
        });

        if(!queue){
            this.stop();
            return;
        }

        // https://github.com/node-modules/urllib
        const html = await this.ctx.curl(queue.url, {
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Referer": "https://www.baidu.com",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36"
            }
        });

        let $ = cheerio.load(html.data);

        const gb2312 = $($('meta[http-equiv="Content-Type"]')[0]).attr('content').indexOf('gb2312') || $($('meta[charset]')[0]).attr('charset').indexOf('gb2312');

        if(gb2312 >= 0){
            let data = iconv.decode(html.data, 'gb2312')
            $ = cheerio.load(data);
        }

        const args = {
            ctx,
            queue,
            cheerio,
            iconv,
            $,
        }

        queue.status = "wating";
        queue.error_message = "";
        await queue.save();

        try{
            let func = new Function('args', (queue as any).task.code);
            await func(args);
            queue.status = "success";
            await queue.save();
        }catch(e){
            queue.status = "error";
            queue.error_message = `${e.stack}`;
            queue.save();
            throw new Error()
        }
    }
}