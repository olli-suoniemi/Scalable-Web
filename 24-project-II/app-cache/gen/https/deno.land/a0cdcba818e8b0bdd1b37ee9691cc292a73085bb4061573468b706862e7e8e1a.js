// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import * as DenoUnstable from "../../_deno_unstable.ts";
function getValidTime(time, name) {
  if (typeof time === "string") {
    time = Number(time);
  }
  if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
    throw new Deno.errors.InvalidData(`invalid ${name}, must not be infinity or NaN`);
  }
  return time;
}
export function futimes(fd, atime, mtime, callback) {
  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  DenoUnstable.futime(fd, atime, mtime).then(()=>callback(null), callback);
}
export function futimesSync(fd, atime, mtime) {
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  DenoUnstable.futimeSync(fd, atime, mtime);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2ZzL19mc19mdXRpbWVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5pbXBvcnQgKiBhcyBEZW5vVW5zdGFibGUgZnJvbSBcIi4uLy4uL19kZW5vX3Vuc3RhYmxlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IENhbGxiYWNrV2l0aEVycm9yIH0gZnJvbSBcIi4vX2ZzX2NvbW1vbi50c1wiO1xuXG5mdW5jdGlvbiBnZXRWYWxpZFRpbWUoXG4gIHRpbWU6IG51bWJlciB8IHN0cmluZyB8IERhdGUsXG4gIG5hbWU6IHN0cmluZyxcbik6IG51bWJlciB8IERhdGUge1xuICBpZiAodHlwZW9mIHRpbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICB0aW1lID0gTnVtYmVyKHRpbWUpO1xuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiB0aW1lID09PSBcIm51bWJlclwiICYmXG4gICAgKE51bWJlci5pc05hTih0aW1lKSB8fCAhTnVtYmVyLmlzRmluaXRlKHRpbWUpKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRGVuby5lcnJvcnMuSW52YWxpZERhdGEoXG4gICAgICBgaW52YWxpZCAke25hbWV9LCBtdXN0IG5vdCBiZSBpbmZpbml0eSBvciBOYU5gLFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdGltZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1dGltZXMoXG4gIGZkOiBudW1iZXIsXG4gIGF0aW1lOiBudW1iZXIgfCBzdHJpbmcgfCBEYXRlLFxuICBtdGltZTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSxcbiAgY2FsbGJhY2s6IENhbGxiYWNrV2l0aEVycm9yLFxuKTogdm9pZCB7XG4gIGlmICghY2FsbGJhY2spIHtcbiAgICB0aHJvdyBuZXcgRGVuby5lcnJvcnMuSW52YWxpZERhdGEoXCJObyBjYWxsYmFjayBmdW5jdGlvbiBzdXBwbGllZFwiKTtcbiAgfVxuXG4gIGF0aW1lID0gZ2V0VmFsaWRUaW1lKGF0aW1lLCBcImF0aW1lXCIpO1xuICBtdGltZSA9IGdldFZhbGlkVGltZShtdGltZSwgXCJtdGltZVwiKTtcblxuICBEZW5vVW5zdGFibGUuZnV0aW1lKGZkLCBhdGltZSwgbXRpbWUpLnRoZW4oKCkgPT4gY2FsbGJhY2sobnVsbCksIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1dGltZXNTeW5jKFxuICBmZDogbnVtYmVyLFxuICBhdGltZTogbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZSxcbiAgbXRpbWU6IG51bWJlciB8IHN0cmluZyB8IERhdGUsXG4pOiB2b2lkIHtcbiAgYXRpbWUgPSBnZXRWYWxpZFRpbWUoYXRpbWUsIFwiYXRpbWVcIik7XG4gIG10aW1lID0gZ2V0VmFsaWRUaW1lKG10aW1lLCBcIm10aW1lXCIpO1xuXG4gIERlbm9VbnN0YWJsZS5mdXRpbWVTeW5jKGZkLCBhdGltZSwgbXRpbWUpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxZQUFZLGtCQUFrQiwwQkFBMEI7QUFHeEQsU0FBUyxhQUNQLElBQTRCLEVBQzVCLElBQVk7RUFFWixJQUFJLE9BQU8sU0FBUyxVQUFVO0lBQzVCLE9BQU8sT0FBTztFQUNoQjtFQUVBLElBQ0UsT0FBTyxTQUFTLFlBQ2hCLENBQUMsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sUUFBUSxDQUFDLEtBQUssR0FDN0M7SUFDQSxNQUFNLElBQUksS0FBSyxNQUFNLENBQUMsV0FBVyxDQUMvQixDQUFDLFFBQVEsRUFBRSxLQUFLLDZCQUE2QixDQUFDO0VBRWxEO0VBRUEsT0FBTztBQUNUO0FBRUEsT0FBTyxTQUFTLFFBQ2QsRUFBVSxFQUNWLEtBQTZCLEVBQzdCLEtBQTZCLEVBQzdCLFFBQTJCO0VBRTNCLElBQUksQ0FBQyxVQUFVO0lBQ2IsTUFBTSxJQUFJLEtBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQztFQUNwQztFQUVBLFFBQVEsYUFBYSxPQUFPO0VBQzVCLFFBQVEsYUFBYSxPQUFPO0VBRTVCLGFBQWEsTUFBTSxDQUFDLElBQUksT0FBTyxPQUFPLElBQUksQ0FBQyxJQUFNLFNBQVMsT0FBTztBQUNuRTtBQUVBLE9BQU8sU0FBUyxZQUNkLEVBQVUsRUFDVixLQUE2QixFQUM3QixLQUE2QjtFQUU3QixRQUFRLGFBQWEsT0FBTztFQUM1QixRQUFRLGFBQWEsT0FBTztFQUU1QixhQUFhLFVBQVUsQ0FBQyxJQUFJLE9BQU87QUFDckMifQ==
// denoCacheMetadata=17103912407204832827,9033289543143316441