import { Context } from 'egg';

declare module 'egg' {
    export interface FlashContext {
        flash: {
            type: 'success' | 'warning' | 'error' | 'info';
            title: string;
            message: string;
        };
        flash_success(title: string, message: string): void;
        flash_warning(title: string, message: string): void;
        flash_error(title: string, message: string): void;
        flash_info(title: string, message: string): void;
    };
    export interface Context extends FlashContext {
        pathPrefix: string;
        session: any
     }; // tslint:disable-line
};