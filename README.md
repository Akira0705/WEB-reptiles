## 可调节的 WEB 爬虫 （egg.js）

![image](https://camo.githubusercontent.com/2d8b242fbf5f3f09a2b4c2a177dbab3a921972de/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f776572656425323042792d4567672e6a732d6666363962342e7376673f7374796c653d666c61742d737175617265) ![image](https://camo.githubusercontent.com/24b56d7268e4b5d9cd70d9a6f8405666748ebf6a/68747470733a2f2f696d672e736869656c64732e696f2f7472617669732f636e6f64656a732f6567672d636e6f64652e7376673f7374796c653d666c61742d737175617265)

## QuickStart

see egg docs for more detail.

## Environment Dependencies
- mysql

## Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

## Deploy


```
// app/config/config.default.ts

// 数据库配置
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'imove',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
  };

```


```bash
$ npm run tsc
$ npm start
```

## Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

## Requirement

- Node.js 8.x
- Typescript 2.8+
- 

## Demo


```
// /dev/task/create

任务名称:阳光电影详情爬取规则

执行代码:
const text = args.$('.co_content8').text();

console.log(text);

var title = text.substring(text.indexOf('◎译　　名') + 6, text.indexOf('◎片　　名'));

console.log(title);

const downlink = text.match(/ftp.*/)[0];

console.log(downlink);

const post = args.$('#Zoom img')[0].attribs.src;

console.log(post);

const Movie = args.ctx.app.model.Movie;

(async () => {
    const movie = await Movie.create({
        name: title,
        grade: 7,
        downlink: JSON.stringify([downlink]),
        post,
        description: 'desc',
        time: '120'
    });
    console.log(movie);
})();

```


```
// /dev/url/new

URL 地址: http://www.ygdy8.net/html/gndy/dyzz/20091008/22098.html

选择执行 Task 规则: 阳光电影详情爬取规则

```




