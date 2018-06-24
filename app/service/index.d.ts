import HackerNews from './HackerNews';
import Run from './run';

declare module 'egg' {
  export interface IService {
    hackerNews: HackerNews;
    run: Run;
  }
}