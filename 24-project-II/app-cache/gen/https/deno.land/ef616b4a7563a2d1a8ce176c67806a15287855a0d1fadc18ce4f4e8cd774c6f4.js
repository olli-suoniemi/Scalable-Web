// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { getValidatedPath } from "../internal/fs/utils.mjs";
import * as pathModule from "../../path/mod.ts";
import { parseFileMode } from "../internal/validators.mjs";
export function chmod(path, mode, callback) {
  path = getValidatedPath(path).toString();
  mode = parseFileMode(mode, "mode");
  Deno.chmod(pathModule.toNamespacedPath(path), mode).then(()=>callback(null), callback);
}
export function chmodSync(path, mode) {
  path = getValidatedPath(path).toString();
  mode = parseFileMode(mode, "mode");
  Deno.chmodSync(pathModule.toNamespacedPath(path), mode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2ZzL19mc19jaG1vZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuaW1wb3J0IHR5cGUgeyBDYWxsYmFja1dpdGhFcnJvciB9IGZyb20gXCIuL19mc19jb21tb24udHNcIjtcbmltcG9ydCB7IGdldFZhbGlkYXRlZFBhdGggfSBmcm9tIFwiLi4vaW50ZXJuYWwvZnMvdXRpbHMubWpzXCI7XG5pbXBvcnQgKiBhcyBwYXRoTW9kdWxlIGZyb20gXCIuLi8uLi9wYXRoL21vZC50c1wiO1xuaW1wb3J0IHsgcGFyc2VGaWxlTW9kZSB9IGZyb20gXCIuLi9pbnRlcm5hbC92YWxpZGF0b3JzLm1qc1wiO1xuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcIi4uL2J1ZmZlci50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY2htb2QoXG4gIHBhdGg6IHN0cmluZyB8IEJ1ZmZlciB8IFVSTCxcbiAgbW9kZTogc3RyaW5nIHwgbnVtYmVyLFxuICBjYWxsYmFjazogQ2FsbGJhY2tXaXRoRXJyb3IsXG4pOiB2b2lkIHtcbiAgcGF0aCA9IGdldFZhbGlkYXRlZFBhdGgocGF0aCkudG9TdHJpbmcoKTtcbiAgbW9kZSA9IHBhcnNlRmlsZU1vZGUobW9kZSwgXCJtb2RlXCIpO1xuXG4gIERlbm8uY2htb2QocGF0aE1vZHVsZS50b05hbWVzcGFjZWRQYXRoKHBhdGgpLCBtb2RlKS50aGVuKFxuICAgICgpID0+IGNhbGxiYWNrKG51bGwpLFxuICAgIGNhbGxiYWNrLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2htb2RTeW5jKHBhdGg6IHN0cmluZyB8IFVSTCwgbW9kZTogc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XG4gIHBhdGggPSBnZXRWYWxpZGF0ZWRQYXRoKHBhdGgpLnRvU3RyaW5nKCk7XG4gIG1vZGUgPSBwYXJzZUZpbGVNb2RlKG1vZGUsIFwibW9kZVwiKTtcblxuICBEZW5vLmNobW9kU3luYyhwYXRoTW9kdWxlLnRvTmFtZXNwYWNlZFBhdGgocGF0aCksIG1vZGUpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUUxRSxTQUFTLGdCQUFnQixRQUFRLDJCQUEyQjtBQUM1RCxZQUFZLGdCQUFnQixvQkFBb0I7QUFDaEQsU0FBUyxhQUFhLFFBQVEsNkJBQTZCO0FBRzNELE9BQU8sU0FBUyxNQUNkLElBQTJCLEVBQzNCLElBQXFCLEVBQ3JCLFFBQTJCO0VBRTNCLE9BQU8saUJBQWlCLE1BQU0sUUFBUTtFQUN0QyxPQUFPLGNBQWMsTUFBTTtFQUUzQixLQUFLLEtBQUssQ0FBQyxXQUFXLGdCQUFnQixDQUFDLE9BQU8sTUFBTSxJQUFJLENBQ3RELElBQU0sU0FBUyxPQUNmO0FBRUo7QUFFQSxPQUFPLFNBQVMsVUFBVSxJQUFrQixFQUFFLElBQXFCO0VBQ2pFLE9BQU8saUJBQWlCLE1BQU0sUUFBUTtFQUN0QyxPQUFPLGNBQWMsTUFBTTtFQUUzQixLQUFLLFNBQVMsQ0FBQyxXQUFXLGdCQUFnQixDQUFDLE9BQU87QUFDcEQifQ==
// denoCacheMetadata=7305683862252332326,14763176237867858679