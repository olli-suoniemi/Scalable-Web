import { RedisCommandArguments } from '.';
import { SortOptions } from './generic-transformers';
export declare const FIRST_KEY_INDEX = 1;
export declare function transformArguments(key: string, options?: SortOptions): RedisCommandArguments;
export declare function transformReply(): Array<string>;
