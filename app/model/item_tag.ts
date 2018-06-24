import { Application } from 'egg';
import { Instance } from 'sequelize';

export interface ItemTagAttributes {
  tag_id: number;
  type: string;
  type_id: number;
}

export interface ItemTagInstance extends Instance<ItemTagAttributes>, ItemTagAttributes {
  id: number;
}

export default (app: Application) => {

  const { STRING, INTEGER } = app.Sequelize;

  const itemTag = app.model.define<ItemTagInstance, ItemTagAttributes>('item_tag', {
    tag_id: INTEGER,
    type:  STRING,
    type_id: INTEGER,
  }, {
      timestamps: false,
  });

  return itemTag;
};