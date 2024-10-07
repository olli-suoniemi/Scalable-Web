// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { existsSync } from "../../fs/exists.ts";
import { fromFileUrl } from "../path.ts";
import { getOpenOptions } from "./_fs_common.ts";
function convertFlagAndModeToOptions(flag, mode) {
  if (!flag && !mode) return undefined;
  if (!flag && mode) return {
    mode
  };
  return {
    ...getOpenOptions(flag),
    mode
  };
}
export function open(path, flagsOrCallback, callbackOrMode, maybeCallback) {
  const flags = typeof flagsOrCallback === "string" ? flagsOrCallback : undefined;
  const callback = typeof flagsOrCallback === "function" ? flagsOrCallback : typeof callbackOrMode === "function" ? callbackOrMode : maybeCallback;
  const mode = typeof callbackOrMode === "number" ? callbackOrMode : undefined;
  path = path instanceof URL ? fromFileUrl(path) : path;
  if (!callback) throw new Error("No callback function supplied");
  if ([
    "ax",
    "ax+",
    "wx",
    "wx+"
  ].includes(flags || "") && existsSync(path)) {
    const err = new Error(`EEXIST: file already exists, open '${path}'`);
    callback(err);
  } else {
    if (flags === "as" || flags === "as+") {
      let err = null, res;
      try {
        res = openSync(path, flags, mode);
      } catch (error) {
        err = error instanceof Error ? error : new Error("[non-error thrown]");
      }
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
      return;
    }
    Deno.open(path, convertFlagAndModeToOptions(flags, mode)).then((file)=>callback(null, file.rid), (err)=>callback(err));
  }
}
export function openSync(path, flagsOrMode, maybeMode) {
  const flags = typeof flagsOrMode === "string" ? flagsOrMode : undefined;
  const mode = typeof flagsOrMode === "number" ? flagsOrMode : maybeMode;
  path = path instanceof URL ? fromFileUrl(path) : path;
  if ([
    "ax",
    "ax+",
    "wx",
    "wx+"
  ].includes(flags || "") && existsSync(path)) {
    throw new Error(`EEXIST: file already exists, open '${path}'`);
  }
  return Deno.openSync(path, convertFlagAndModeToOptions(flags, mode)).rid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2ZzL19mc19vcGVuLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcIi4uLy4uL2ZzL2V4aXN0cy50c1wiO1xuaW1wb3J0IHsgZnJvbUZpbGVVcmwgfSBmcm9tIFwiLi4vcGF0aC50c1wiO1xuaW1wb3J0IHsgZ2V0T3Blbk9wdGlvbnMgfSBmcm9tIFwiLi9fZnNfY29tbW9uLnRzXCI7XG5cbmV4cG9ydCB0eXBlIG9wZW5GbGFncyA9XG4gIHwgXCJhXCJcbiAgfCBcImF4XCJcbiAgfCBcImErXCJcbiAgfCBcImF4K1wiXG4gIHwgXCJhc1wiXG4gIHwgXCJhcytcIlxuICB8IFwiclwiXG4gIHwgXCJyK1wiXG4gIHwgXCJycytcIlxuICB8IFwid1wiXG4gIHwgXCJ3eFwiXG4gIHwgXCJ3K1wiXG4gIHwgXCJ3eCtcIjtcblxudHlwZSBvcGVuQ2FsbGJhY2sgPSAoZXJyOiBFcnJvciB8IG51bGwsIGZkOiBudW1iZXIpID0+IHZvaWQ7XG5cbmZ1bmN0aW9uIGNvbnZlcnRGbGFnQW5kTW9kZVRvT3B0aW9ucyhcbiAgZmxhZz86IG9wZW5GbGFncyxcbiAgbW9kZT86IG51bWJlcixcbik6IERlbm8uT3Blbk9wdGlvbnMgfCB1bmRlZmluZWQge1xuICBpZiAoIWZsYWcgJiYgIW1vZGUpIHJldHVybiB1bmRlZmluZWQ7XG4gIGlmICghZmxhZyAmJiBtb2RlKSByZXR1cm4geyBtb2RlIH07XG4gIHJldHVybiB7IC4uLmdldE9wZW5PcHRpb25zKGZsYWcpLCBtb2RlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuKHBhdGg6IHN0cmluZyB8IFVSTCwgY2FsbGJhY2s6IG9wZW5DYWxsYmFjayk6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gb3BlbihcbiAgcGF0aDogc3RyaW5nIHwgVVJMLFxuICBmbGFnczogb3BlbkZsYWdzLFxuICBjYWxsYmFjazogb3BlbkNhbGxiYWNrLFxuKTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBvcGVuKFxuICBwYXRoOiBzdHJpbmcgfCBVUkwsXG4gIGZsYWdzOiBvcGVuRmxhZ3MsXG4gIG1vZGU6IG51bWJlcixcbiAgY2FsbGJhY2s6IG9wZW5DYWxsYmFjayxcbik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gb3BlbihcbiAgcGF0aDogc3RyaW5nIHwgVVJMLFxuICBmbGFnc09yQ2FsbGJhY2s6IG9wZW5DYWxsYmFjayB8IG9wZW5GbGFncyxcbiAgY2FsbGJhY2tPck1vZGU/OiBvcGVuQ2FsbGJhY2sgfCBudW1iZXIsXG4gIG1heWJlQ2FsbGJhY2s/OiBvcGVuQ2FsbGJhY2ssXG4pIHtcbiAgY29uc3QgZmxhZ3MgPSB0eXBlb2YgZmxhZ3NPckNhbGxiYWNrID09PSBcInN0cmluZ1wiXG4gICAgPyBmbGFnc09yQ2FsbGJhY2tcbiAgICA6IHVuZGVmaW5lZDtcbiAgY29uc3QgY2FsbGJhY2sgPSB0eXBlb2YgZmxhZ3NPckNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCJcbiAgICA/IGZsYWdzT3JDYWxsYmFja1xuICAgIDogdHlwZW9mIGNhbGxiYWNrT3JNb2RlID09PSBcImZ1bmN0aW9uXCJcbiAgICA/IGNhbGxiYWNrT3JNb2RlXG4gICAgOiBtYXliZUNhbGxiYWNrO1xuICBjb25zdCBtb2RlID0gdHlwZW9mIGNhbGxiYWNrT3JNb2RlID09PSBcIm51bWJlclwiID8gY2FsbGJhY2tPck1vZGUgOiB1bmRlZmluZWQ7XG4gIHBhdGggPSBwYXRoIGluc3RhbmNlb2YgVVJMID8gZnJvbUZpbGVVcmwocGF0aCkgOiBwYXRoO1xuXG4gIGlmICghY2FsbGJhY2spIHRocm93IG5ldyBFcnJvcihcIk5vIGNhbGxiYWNrIGZ1bmN0aW9uIHN1cHBsaWVkXCIpO1xuXG4gIGlmIChbXCJheFwiLCBcImF4K1wiLCBcInd4XCIsIFwid3grXCJdLmluY2x1ZGVzKGZsYWdzIHx8IFwiXCIpICYmIGV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVFWElTVDogZmlsZSBhbHJlYWR5IGV4aXN0cywgb3BlbiAnJHtwYXRofSdgKTtcbiAgICAoY2FsbGJhY2sgYXMgKGVycjogRXJyb3IpID0+IHZvaWQpKGVycik7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGZsYWdzID09PSBcImFzXCIgfHwgZmxhZ3MgPT09IFwiYXMrXCIpIHtcbiAgICAgIGxldCBlcnI6IEVycm9yIHwgbnVsbCA9IG51bGwsIHJlczogbnVtYmVyO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzID0gb3BlblN5bmMocGF0aCwgZmxhZ3MsIG1vZGUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yIDogbmV3IEVycm9yKFwiW25vbi1lcnJvciB0aHJvd25dXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGVycikge1xuICAgICAgICAoY2FsbGJhY2sgYXMgKGVycjogRXJyb3IpID0+IHZvaWQpKGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhudWxsLCByZXMhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgRGVuby5vcGVuKHBhdGgsIGNvbnZlcnRGbGFnQW5kTW9kZVRvT3B0aW9ucyhmbGFncywgbW9kZSkpLnRoZW4oXG4gICAgICAoZmlsZSkgPT4gY2FsbGJhY2sobnVsbCwgZmlsZS5yaWQpLFxuICAgICAgKGVycikgPT4gKGNhbGxiYWNrIGFzIChlcnI6IEVycm9yKSA9PiB2b2lkKShlcnIpLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5TeW5jKHBhdGg6IHN0cmluZyB8IFVSTCk6IG51bWJlcjtcbmV4cG9ydCBmdW5jdGlvbiBvcGVuU3luYyhwYXRoOiBzdHJpbmcgfCBVUkwsIGZsYWdzPzogb3BlbkZsYWdzKTogbnVtYmVyO1xuZXhwb3J0IGZ1bmN0aW9uIG9wZW5TeW5jKHBhdGg6IHN0cmluZyB8IFVSTCwgbW9kZT86IG51bWJlcik6IG51bWJlcjtcbmV4cG9ydCBmdW5jdGlvbiBvcGVuU3luYyhcbiAgcGF0aDogc3RyaW5nIHwgVVJMLFxuICBmbGFncz86IG9wZW5GbGFncyxcbiAgbW9kZT86IG51bWJlcixcbik6IG51bWJlcjtcbmV4cG9ydCBmdW5jdGlvbiBvcGVuU3luYyhcbiAgcGF0aDogc3RyaW5nIHwgVVJMLFxuICBmbGFnc09yTW9kZT86IG9wZW5GbGFncyB8IG51bWJlcixcbiAgbWF5YmVNb2RlPzogbnVtYmVyLFxuKSB7XG4gIGNvbnN0IGZsYWdzID0gdHlwZW9mIGZsYWdzT3JNb2RlID09PSBcInN0cmluZ1wiID8gZmxhZ3NPck1vZGUgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG1vZGUgPSB0eXBlb2YgZmxhZ3NPck1vZGUgPT09IFwibnVtYmVyXCIgPyBmbGFnc09yTW9kZSA6IG1heWJlTW9kZTtcbiAgcGF0aCA9IHBhdGggaW5zdGFuY2VvZiBVUkwgPyBmcm9tRmlsZVVybChwYXRoKSA6IHBhdGg7XG5cbiAgaWYgKFtcImF4XCIsIFwiYXgrXCIsIFwid3hcIiwgXCJ3eCtcIl0uaW5jbHVkZXMoZmxhZ3MgfHwgXCJcIikgJiYgZXhpc3RzU3luYyhwYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRUVYSVNUOiBmaWxlIGFscmVhZHkgZXhpc3RzLCBvcGVuICcke3BhdGh9J2ApO1xuICB9XG5cbiAgcmV0dXJuIERlbm8ub3BlblN5bmMocGF0aCwgY29udmVydEZsYWdBbmRNb2RlVG9PcHRpb25zKGZsYWdzLCBtb2RlKSkucmlkO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxTQUFTLFVBQVUsUUFBUSxxQkFBcUI7QUFDaEQsU0FBUyxXQUFXLFFBQVEsYUFBYTtBQUN6QyxTQUFTLGNBQWMsUUFBUSxrQkFBa0I7QUFtQmpELFNBQVMsNEJBQ1AsSUFBZ0IsRUFDaEIsSUFBYTtFQUViLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxPQUFPO0VBQzNCLElBQUksQ0FBQyxRQUFRLE1BQU0sT0FBTztJQUFFO0VBQUs7RUFDakMsT0FBTztJQUFFLEdBQUcsZUFBZSxLQUFLO0lBQUU7RUFBSztBQUN6QztBQWNBLE9BQU8sU0FBUyxLQUNkLElBQWtCLEVBQ2xCLGVBQXlDLEVBQ3pDLGNBQXNDLEVBQ3RDLGFBQTRCO0VBRTVCLE1BQU0sUUFBUSxPQUFPLG9CQUFvQixXQUNyQyxrQkFDQTtFQUNKLE1BQU0sV0FBVyxPQUFPLG9CQUFvQixhQUN4QyxrQkFDQSxPQUFPLG1CQUFtQixhQUMxQixpQkFDQTtFQUNKLE1BQU0sT0FBTyxPQUFPLG1CQUFtQixXQUFXLGlCQUFpQjtFQUNuRSxPQUFPLGdCQUFnQixNQUFNLFlBQVksUUFBUTtFQUVqRCxJQUFJLENBQUMsVUFBVSxNQUFNLElBQUksTUFBTTtFQUUvQixJQUFJO0lBQUM7SUFBTTtJQUFPO0lBQU07R0FBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLE9BQU8sV0FBVyxPQUFPO0lBQ3hFLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRSxTQUFrQztFQUNyQyxPQUFPO0lBQ0wsSUFBSSxVQUFVLFFBQVEsVUFBVSxPQUFPO01BQ3JDLElBQUksTUFBb0IsTUFBTTtNQUM5QixJQUFJO1FBQ0YsTUFBTSxTQUFTLE1BQU0sT0FBTztNQUM5QixFQUFFLE9BQU8sT0FBTztRQUNkLE1BQU0saUJBQWlCLFFBQVEsUUFBUSxJQUFJLE1BQU07TUFDbkQ7TUFDQSxJQUFJLEtBQUs7UUFDTixTQUFrQztNQUNyQyxPQUFPO1FBQ0wsU0FBUyxNQUFNO01BQ2pCO01BQ0E7SUFDRjtJQUNBLEtBQUssSUFBSSxDQUFDLE1BQU0sNEJBQTRCLE9BQU8sT0FBTyxJQUFJLENBQzVELENBQUMsT0FBUyxTQUFTLE1BQU0sS0FBSyxHQUFHLEdBQ2pDLENBQUMsTUFBUSxBQUFDLFNBQWtDO0VBRWhEO0FBQ0Y7QUFVQSxPQUFPLFNBQVMsU0FDZCxJQUFrQixFQUNsQixXQUFnQyxFQUNoQyxTQUFrQjtFQUVsQixNQUFNLFFBQVEsT0FBTyxnQkFBZ0IsV0FBVyxjQUFjO0VBQzlELE1BQU0sT0FBTyxPQUFPLGdCQUFnQixXQUFXLGNBQWM7RUFDN0QsT0FBTyxnQkFBZ0IsTUFBTSxZQUFZLFFBQVE7RUFFakQsSUFBSTtJQUFDO0lBQU07SUFBTztJQUFNO0dBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxPQUFPLFdBQVcsT0FBTztJQUN4RSxNQUFNLElBQUksTUFBTSxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQy9EO0VBRUEsT0FBTyxLQUFLLFFBQVEsQ0FBQyxNQUFNLDRCQUE0QixPQUFPLE9BQU8sR0FBRztBQUMxRSJ9
// denoCacheMetadata=6186075108344797189,1307862119393578948