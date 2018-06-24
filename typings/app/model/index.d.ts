// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ItemTag from '../../../app/model/item_tag';
import Movie from '../../../app/model/movie';
import Tag from '../../../app/model/tag';
import Task from '../../../app/model/task';
import UrlQueue from '../../../app/model/url_queue';

declare module 'sequelize' {
  interface Sequelize {
    ItemTag: ReturnType<typeof ItemTag>;
    Movie: ReturnType<typeof Movie>;
    Tag: ReturnType<typeof Tag>;
    Task: ReturnType<typeof Task>;
    UrlQueue: ReturnType<typeof UrlQueue>;
  }
}
