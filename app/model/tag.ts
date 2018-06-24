import { Application } from 'egg';
import { Instance } from 'sequelize';

export interface TagAttributes {
  name: string;
}

export interface TagInstance extends Instance<TagAttributes>, TagAttributes {
  id: number;
}

export default (app: Application) => {

  const { STRING } = app.Sequelize;

  const tag = app.model.define<TagInstance, TagAttributes>('tag', {
    name: STRING(60),
  }, {
    timestamps: false,
  });

  tag.associate = () => {
    tag.belongsToMany(app.model.Movie, {
      through: {
        model: app.model.ItemTag,
      },
      foreignKey: 'tag_id',
      constraints: false,
    });
  };

  return tag;
};