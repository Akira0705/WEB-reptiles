import * as path from 'path'

export default {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  flash: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-flash')
  }
};
