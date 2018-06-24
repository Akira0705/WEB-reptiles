import { Application } from 'egg'

declare module 'egg' {
    export interface Application {
        middlewares: {
            adminChecker: () => Promise<any>
        }
    }
}