import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare const FIRST_KEY_INDEX = 1;
export declare function transformArguments(key: RedisCommandArgument): RedisCommandArguments;
export { transformSortedSetMemberNullReply as transformReply } from './generic-transformers';
