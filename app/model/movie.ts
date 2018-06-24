import { Application } from 'egg';
import { Instance } from 'sequelize';

export interface MovieAttributes {
  name: string;
  grade: number;
  downlink: string;
  post: string;
  description: string;
  time: number;
}

export interface MovieInstance extends Instance<MovieAttributes>, MovieAttributes {
  id: number;
}

export default (app: Application) => {

  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const movie = app.model.define<MovieInstance, MovieAttributes>('movie', {
    name: STRING,
    grade: INTEGER,
    downlink: STRING,
    post: STRING,
    description: TEXT,
    time: INTEGER,
  });

  movie.associate = () => {
    movie.belongsToMany(app.model.Tag, {
      through: {
        model: app.model.ItemTag,
        scope: {
          type: 'movie',
        },
      },
      as: 'tag',
      foreignKey: 'type_id',
      constraints: false,
    });

    movie.belongsToMany(app.model.Tag, {
      through: {
        model: app.model.ItemTag,
        scope: {
          type: 'cuntry',
        },
      },
      as: 'cuntry',
      foreignKey: 'type_id',
      constraints: false,
    });
  };

  return movie;
};