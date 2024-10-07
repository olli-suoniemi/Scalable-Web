// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import * as DenoUnstable from "../../_deno_unstable.ts";
import { fromFileUrl } from "../path.ts";
function getValidTime(time, name) {
  if (typeof time === "string") {
    time = Number(time);
  }
  if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
    throw new Deno.errors.InvalidData(`invalid ${name}, must not be infinity or NaN`);
  }
  return time;
}
export function utimes(path, atime, mtime, callback) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  DenoUnstable.utime(path, atime, mtime).then(()=>callback(null), callback);
}
export function utimesSync(path, atime, mtime) {
  path = path instanceof URL ? fromFileUrl(path) : path;
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  DenoUnstable.utimeSync(path, atime, mtime);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2ZzL19mc191dGltZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbmltcG9ydCAqIGFzIERlbm9VbnN0YWJsZSBmcm9tIFwiLi4vLi4vX2Rlbm9fdW5zdGFibGUudHNcIjtcbmltcG9ydCB0eXBlIHsgQ2FsbGJhY2tXaXRoRXJyb3IgfSBmcm9tIFwiLi9fZnNfY29tbW9uLnRzXCI7XG5pbXBvcnQgeyBmcm9tRmlsZVVybCB9IGZyb20gXCIuLi9wYXRoLnRzXCI7XG5cbmZ1bmN0aW9uIGdldFZhbGlkVGltZShcbiAgdGltZTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSxcbiAgbmFtZTogc3RyaW5nLFxuKTogbnVtYmVyIHwgRGF0ZSB7XG4gIGlmICh0eXBlb2YgdGltZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHRpbWUgPSBOdW1iZXIodGltZSk7XG4gIH1cblxuICBpZiAoXG4gICAgdHlwZW9mIHRpbWUgPT09IFwibnVtYmVyXCIgJiZcbiAgICAoTnVtYmVyLmlzTmFOKHRpbWUpIHx8ICFOdW1iZXIuaXNGaW5pdGUodGltZSkpXG4gICkge1xuICAgIHRocm93IG5ldyBEZW5vLmVycm9ycy5JbnZhbGlkRGF0YShcbiAgICAgIGBpbnZhbGlkICR7bmFtZX0sIG11c3Qgbm90IGJlIGluZmluaXR5IG9yIE5hTmAsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB0aW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRpbWVzKFxuICBwYXRoOiBzdHJpbmcgfCBVUkwsXG4gIGF0aW1lOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLFxuICBtdGltZTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSxcbiAgY2FsbGJhY2s6IENhbGxiYWNrV2l0aEVycm9yLFxuKTogdm9pZCB7XG4gIHBhdGggPSBwYXRoIGluc3RhbmNlb2YgVVJMID8gZnJvbUZpbGVVcmwocGF0aCkgOiBwYXRoO1xuXG4gIGlmICghY2FsbGJhY2spIHtcbiAgICB0aHJvdyBuZXcgRGVuby5lcnJvcnMuSW52YWxpZERhdGEoXCJObyBjYWxsYmFjayBmdW5jdGlvbiBzdXBwbGllZFwiKTtcbiAgfVxuXG4gIGF0aW1lID0gZ2V0VmFsaWRUaW1lKGF0aW1lLCBcImF0aW1lXCIpO1xuICBtdGltZSA9IGdldFZhbGlkVGltZShtdGltZSwgXCJtdGltZVwiKTtcblxuICBEZW5vVW5zdGFibGUudXRpbWUocGF0aCwgYXRpbWUsIG10aW1lKS50aGVuKCgpID0+IGNhbGxiYWNrKG51bGwpLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dGltZXNTeW5jKFxuICBwYXRoOiBzdHJpbmcgfCBVUkwsXG4gIGF0aW1lOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLFxuICBtdGltZTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSxcbik6IHZvaWQge1xuICBwYXRoID0gcGF0aCBpbnN0YW5jZW9mIFVSTCA/IGZyb21GaWxlVXJsKHBhdGgpIDogcGF0aDtcbiAgYXRpbWUgPSBnZXRWYWxpZFRpbWUoYXRpbWUsIFwiYXRpbWVcIik7XG4gIG10aW1lID0gZ2V0VmFsaWRUaW1lKG10aW1lLCBcIm10aW1lXCIpO1xuXG4gIERlbm9VbnN0YWJsZS51dGltZVN5bmMocGF0aCwgYXRpbWUsIG10aW1lKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUsWUFBWSxrQkFBa0IsMEJBQTBCO0FBRXhELFNBQVMsV0FBVyxRQUFRLGFBQWE7QUFFekMsU0FBUyxhQUNQLElBQTRCLEVBQzVCLElBQVk7RUFFWixJQUFJLE9BQU8sU0FBUyxVQUFVO0lBQzVCLE9BQU8sT0FBTztFQUNoQjtFQUVBLElBQ0UsT0FBTyxTQUFTLFlBQ2hCLENBQUMsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sUUFBUSxDQUFDLEtBQUssR0FDN0M7SUFDQSxNQUFNLElBQUksS0FBSyxNQUFNLENBQUMsV0FBVyxDQUMvQixDQUFDLFFBQVEsRUFBRSxLQUFLLDZCQUE2QixDQUFDO0VBRWxEO0VBRUEsT0FBTztBQUNUO0FBRUEsT0FBTyxTQUFTLE9BQ2QsSUFBa0IsRUFDbEIsS0FBNkIsRUFDN0IsS0FBNkIsRUFDN0IsUUFBMkI7RUFFM0IsT0FBTyxnQkFBZ0IsTUFBTSxZQUFZLFFBQVE7RUFFakQsSUFBSSxDQUFDLFVBQVU7SUFDYixNQUFNLElBQUksS0FBSyxNQUFNLENBQUMsV0FBVyxDQUFDO0VBQ3BDO0VBRUEsUUFBUSxhQUFhLE9BQU87RUFDNUIsUUFBUSxhQUFhLE9BQU87RUFFNUIsYUFBYSxLQUFLLENBQUMsTUFBTSxPQUFPLE9BQU8sSUFBSSxDQUFDLElBQU0sU0FBUyxPQUFPO0FBQ3BFO0FBRUEsT0FBTyxTQUFTLFdBQ2QsSUFBa0IsRUFDbEIsS0FBNkIsRUFDN0IsS0FBNkI7RUFFN0IsT0FBTyxnQkFBZ0IsTUFBTSxZQUFZLFFBQVE7RUFDakQsUUFBUSxhQUFhLE9BQU87RUFDNUIsUUFBUSxhQUFhLE9BQU87RUFFNUIsYUFBYSxTQUFTLENBQUMsTUFBTSxPQUFPO0FBQ3RDIn0=
// denoCacheMetadata=16711294504826670356,14609989476627503707