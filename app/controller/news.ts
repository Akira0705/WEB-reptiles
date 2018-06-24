import { Controller } from 'egg';

export default class NewsController extends Controller {
  public async list() {
    const { ctx, app } = this;

    const creater = app.model.Movie.create({
      description: 'desc',
      downlink: JSON.stringify(['downlink1', ['downlink12']]),
      grade: 9.2,
      name: 'dianyin 1',
      post: 'http://google.com',
      time: 125,
    });

    const imovie = await creater;

    await (imovie as any).createTag({
      name: 'tag2',
    });

    await (imovie as any).createCuntry({
      name: 'tag33',
    });

    await imovie.save();

    const m = await (app.model.Movie as any).findOne({
      where: {
        id: 1,
      },
      include: [
        {
          model: app.model.Tag,
          scope: 'movie',
          as: 'tag',
        },
        {
          model: app.model.Tag,
          scope: 'cuntry',
          as: 'cuntry',
        },
      ],
    });

    ctx.body = JSON.stringify(m.toJSON());

    // await imovie.addTags([tag1, tag2]);
  }

  public async detail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const newsInfo = await ctx.service.news.getItem(id);
    // get comment parallel
    const commentList = await Promise.all(newsInfo.kids.map((_id) => ctx.service.news.getItem(_id)));
    await ctx.render('news/detail.tpl', { item: newsInfo, comments: commentList });
  }

  public async user() {
    const { ctx } = this;
    const id = ctx.params.id;
    const userInfo = await ctx.service.news.getUser(id);
    await ctx.render('news/user.tpl', { user: userInfo });
  }
}
