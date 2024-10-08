// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { Timeout, TIMEOUT_MAX } from "./internal/timers.mjs";
import { validateCallback } from "./internal/validators.mjs";
const setTimeout_ = globalThis.setTimeout;
const clearTimeout_ = globalThis.clearTimeout;
const setInterval_ = globalThis.setInterval;
const clearInterval_ = globalThis.clearInterval;
export function setTimeout(cb, timeout, ...args) {
  validateCallback(cb);
  if (typeof timeout === "number" && timeout > TIMEOUT_MAX) {
    timeout = 1;
  }
  const timer = new Timeout(setTimeout_((...args)=>{
    cb.bind(timer)(...args);
  }, timeout, ...args));
  return timer;
}
export function setUnrefTimeout(cb, timeout, ...args) {
  setTimeout(cb, timeout, ...args).unref();
}
export function clearTimeout(timeout) {
  if (timeout == null) {
    return;
  }
  clearTimeout_(+timeout);
}
export function setInterval(cb, timeout, ...args) {
  validateCallback(cb);
  if (typeof timeout === "number" && timeout > TIMEOUT_MAX) {
    timeout = 1;
  }
  const timer = new Timeout(setInterval_((...args)=>{
    cb.bind(timer)(...args);
  }, timeout, ...args));
  return timer;
}
export function clearInterval(timeout) {
  if (timeout == null) {
    return;
  }
  clearInterval_(+timeout);
}
// TODO(bartlomieju): implement the 'NodeJS.Immediate' versions of the timers.
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1163ead296d84e7a3c80d71e7c81ecbd1a130e9a/types/node/v12/globals.d.ts#L1120-L1131
export const setImmediate = (cb, ...args)=>setTimeout(cb, 0, ...args);
export const clearImmediate = clearTimeout;
export default {
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  setImmediate,
  clearImmediate
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvdGltZXJzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IFRpbWVvdXQsIFRJTUVPVVRfTUFYIH0gZnJvbSBcIi4vaW50ZXJuYWwvdGltZXJzLm1qc1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVDYWxsYmFjayB9IGZyb20gXCIuL2ludGVybmFsL3ZhbGlkYXRvcnMubWpzXCI7XG5jb25zdCBzZXRUaW1lb3V0XyA9IGdsb2JhbFRoaXMuc2V0VGltZW91dDtcbmNvbnN0IGNsZWFyVGltZW91dF8gPSBnbG9iYWxUaGlzLmNsZWFyVGltZW91dDtcbmNvbnN0IHNldEludGVydmFsXyA9IGdsb2JhbFRoaXMuc2V0SW50ZXJ2YWw7XG5jb25zdCBjbGVhckludGVydmFsXyA9IGdsb2JhbFRoaXMuY2xlYXJJbnRlcnZhbDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lb3V0KFxuICBjYjogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZCxcbiAgdGltZW91dD86IG51bWJlcixcbiAgLi4uYXJnczogdW5rbm93bltdXG4pIHtcbiAgdmFsaWRhdGVDYWxsYmFjayhjYik7XG4gIGlmICh0eXBlb2YgdGltZW91dCA9PT0gXCJudW1iZXJcIiAmJiB0aW1lb3V0ID4gVElNRU9VVF9NQVgpIHtcbiAgICB0aW1lb3V0ID0gMTtcbiAgfVxuICBjb25zdCB0aW1lciA9IG5ldyBUaW1lb3V0KHNldFRpbWVvdXRfKFxuICAgICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgICAgIGNiLmJpbmQodGltZXIpKC4uLmFyZ3MpO1xuICAgIH0sXG4gICAgdGltZW91dCxcbiAgICAuLi5hcmdzLFxuICApKTtcbiAgcmV0dXJuIHRpbWVyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldFVucmVmVGltZW91dChcbiAgY2I6ICguLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQsXG4gIHRpbWVvdXQ/OiBudW1iZXIsXG4gIC4uLmFyZ3M6IHVua25vd25bXVxuKSB7XG4gIHNldFRpbWVvdXQoY2IsIHRpbWVvdXQsIC4uLmFyZ3MpLnVucmVmKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xlYXJUaW1lb3V0KHRpbWVvdXQ/OiBUaW1lb3V0IHwgbnVtYmVyKSB7XG4gIGlmICh0aW1lb3V0ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY2xlYXJUaW1lb3V0XygrdGltZW91dCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0SW50ZXJ2YWwoXG4gIGNiOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkLFxuICB0aW1lb3V0PzogbnVtYmVyLFxuICAuLi5hcmdzOiB1bmtub3duW11cbikge1xuICB2YWxpZGF0ZUNhbGxiYWNrKGNiKTtcbiAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSBcIm51bWJlclwiICYmIHRpbWVvdXQgPiBUSU1FT1VUX01BWCkge1xuICAgIHRpbWVvdXQgPSAxO1xuICB9XG4gIGNvbnN0IHRpbWVyID0gbmV3IFRpbWVvdXQoc2V0SW50ZXJ2YWxfKFxuICAgICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgICAgIGNiLmJpbmQodGltZXIpKC4uLmFyZ3MpO1xuICAgIH0sXG4gICAgdGltZW91dCxcbiAgICAuLi5hcmdzLFxuICApKTtcbiAgcmV0dXJuIHRpbWVyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFySW50ZXJ2YWwodGltZW91dD86IFRpbWVvdXQgfCBudW1iZXIgfCBzdHJpbmcpIHtcbiAgaWYgKHRpbWVvdXQgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjbGVhckludGVydmFsXygrdGltZW91dCk7XG59XG4vLyBUT0RPKGJhcnRsb21pZWp1KTogaW1wbGVtZW50IHRoZSAnTm9kZUpTLkltbWVkaWF0ZScgdmVyc2lvbnMgb2YgdGhlIHRpbWVycy5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EZWZpbml0ZWx5VHlwZWQvRGVmaW5pdGVseVR5cGVkL2Jsb2IvMTE2M2VhZDI5NmQ4NGU3YTNjODBkNzFlN2M4MWVjYmQxYTEzMGU5YS90eXBlcy9ub2RlL3YxMi9nbG9iYWxzLmQudHMjTDExMjAtTDExMzFcbmV4cG9ydCBjb25zdCBzZXRJbW1lZGlhdGUgPSAoXG4gIGNiOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkLFxuICAuLi5hcmdzOiB1bmtub3duW11cbik6IFRpbWVvdXQgPT4gc2V0VGltZW91dChjYiwgMCwgLi4uYXJncyk7XG5leHBvcnQgY29uc3QgY2xlYXJJbW1lZGlhdGUgPSBjbGVhclRpbWVvdXQ7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2V0VGltZW91dCxcbiAgY2xlYXJUaW1lb3V0LFxuICBzZXRJbnRlcnZhbCxcbiAgY2xlYXJJbnRlcnZhbCxcbiAgc2V0SW1tZWRpYXRlLFxuICBjbGVhckltbWVkaWF0ZSxcbn07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBRTFFLFNBQVMsT0FBTyxFQUFFLFdBQVcsUUFBUSx3QkFBd0I7QUFDN0QsU0FBUyxnQkFBZ0IsUUFBUSw0QkFBNEI7QUFDN0QsTUFBTSxjQUFjLFdBQVcsVUFBVTtBQUN6QyxNQUFNLGdCQUFnQixXQUFXLFlBQVk7QUFDN0MsTUFBTSxlQUFlLFdBQVcsV0FBVztBQUMzQyxNQUFNLGlCQUFpQixXQUFXLGFBQWE7QUFDL0MsT0FBTyxTQUFTLFdBQ2QsRUFBZ0MsRUFDaEMsT0FBZ0IsRUFDaEIsR0FBRyxJQUFlO0VBRWxCLGlCQUFpQjtFQUNqQixJQUFJLE9BQU8sWUFBWSxZQUFZLFVBQVUsYUFBYTtJQUN4RCxVQUFVO0VBQ1o7RUFDQSxNQUFNLFFBQVEsSUFBSSxRQUFRLFlBQ3hCLENBQUMsR0FBRztJQUNGLEdBQUcsSUFBSSxDQUFDLFVBQVU7RUFDcEIsR0FDQSxZQUNHO0VBRUwsT0FBTztBQUNUO0FBQ0EsT0FBTyxTQUFTLGdCQUNkLEVBQWdDLEVBQ2hDLE9BQWdCLEVBQ2hCLEdBQUcsSUFBZTtFQUVsQixXQUFXLElBQUksWUFBWSxNQUFNLEtBQUs7QUFDeEM7QUFDQSxPQUFPLFNBQVMsYUFBYSxPQUEwQjtFQUNyRCxJQUFJLFdBQVcsTUFBTTtJQUNuQjtFQUNGO0VBQ0EsY0FBYyxDQUFDO0FBQ2pCO0FBQ0EsT0FBTyxTQUFTLFlBQ2QsRUFBZ0MsRUFDaEMsT0FBZ0IsRUFDaEIsR0FBRyxJQUFlO0VBRWxCLGlCQUFpQjtFQUNqQixJQUFJLE9BQU8sWUFBWSxZQUFZLFVBQVUsYUFBYTtJQUN4RCxVQUFVO0VBQ1o7RUFDQSxNQUFNLFFBQVEsSUFBSSxRQUFRLGFBQ3hCLENBQUMsR0FBRztJQUNGLEdBQUcsSUFBSSxDQUFDLFVBQVU7RUFDcEIsR0FDQSxZQUNHO0VBRUwsT0FBTztBQUNUO0FBQ0EsT0FBTyxTQUFTLGNBQWMsT0FBbUM7RUFDL0QsSUFBSSxXQUFXLE1BQU07SUFDbkI7RUFDRjtFQUNBLGVBQWUsQ0FBQztBQUNsQjtBQUNBLDhFQUE4RTtBQUM5RSwySUFBMkk7QUFDM0ksT0FBTyxNQUFNLGVBQWUsQ0FDMUIsSUFDQSxHQUFHLE9BQ1MsV0FBVyxJQUFJLE1BQU0sTUFBTTtBQUN6QyxPQUFPLE1BQU0saUJBQWlCLGFBQWE7QUFFM0MsZUFBZTtFQUNiO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNGLEVBQUUifQ==
// denoCacheMetadata=2965689760717525444,17088603185868008468