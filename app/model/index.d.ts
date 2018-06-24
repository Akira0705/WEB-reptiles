import * as sequelize from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { ItemTagAttributes, ItemTagInstance } from './item_tag';
import { MovieAttributes, MovieInstance } from './movie';
import { TagAttributes, TagInstance } from './tag';
import { TaskAttributes, TaskInstance } from './task';
import { UrlQueueAttributes, UrlQueueInstance } from './url_queue';

interface Models {
    // 这里需要大写开头
    UrlQueue: Model<UrlQueueInstance, UrlQueueAttributes>;
    Task: Model<TaskInstance, TaskAttributes>;
    Tag: Model<TagInstance, TagAttributes>;
    ItemTag: Model<ItemTagInstance, ItemTagAttributes>;
    Movie: Model<MovieInstance, MovieAttributes>;
}

declare module 'egg' {
    export interface Application {
        Sequelize: typeof sequelize;
        model: Sequelize & Models;
    }
    export interface Context {
        model: Sequelize & Models;
    }
}

declare module 'sequelize' {
    interface Model<TInstance, TAttributes> {
        associate: () => any;
    }
}