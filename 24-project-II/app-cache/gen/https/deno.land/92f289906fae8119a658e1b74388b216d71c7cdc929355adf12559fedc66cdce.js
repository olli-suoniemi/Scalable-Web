// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { ERR_INVALID_URI } from "./errors.ts";
export const hexTable = new Array(256);
for(let i = 0; i < 256; ++i){
  hexTable[i] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
}
// deno-fmt-ignore
export const isHexTable = new Int8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]);
export function encodeStr(str, noEscapeTable, hexTable) {
  const len = str.length;
  if (len === 0) return "";
  let out = "";
  let lastPos = 0;
  for(let i = 0; i < len; i++){
    let c = str.charCodeAt(i);
    // ASCII
    if (c < 0x80) {
      if (noEscapeTable[c] === 1) continue;
      if (lastPos < i) out += str.slice(lastPos, i);
      lastPos = i + 1;
      out += hexTable[c];
      continue;
    }
    if (lastPos < i) out += str.slice(lastPos, i);
    // Multi-byte characters ...
    if (c < 0x800) {
      lastPos = i + 1;
      out += hexTable[0xc0 | c >> 6] + hexTable[0x80 | c & 0x3f];
      continue;
    }
    if (c < 0xd800 || c >= 0xe000) {
      lastPos = i + 1;
      out += hexTable[0xe0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3f] + hexTable[0x80 | c & 0x3f];
      continue;
    }
    // Surrogate pair
    ++i;
    // This branch should never happen because all URLSearchParams entries
    // should already be converted to USVString. But, included for
    // completion's sake anyway.
    if (i >= len) throw new ERR_INVALID_URI();
    const c2 = str.charCodeAt(i) & 0x3ff;
    lastPos = i + 1;
    c = 0x10000 + ((c & 0x3ff) << 10 | c2);
    out += hexTable[0xf0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3f] + hexTable[0x80 | c >> 6 & 0x3f] + hexTable[0x80 | c & 0x3f];
  }
  if (lastPos === 0) return str;
  if (lastPos < len) return out + str.slice(lastPos);
  return out;
}
export default {
  hexTable,
  encodeStr,
  isHexTable
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvaW50ZXJuYWwvcXVlcnlzdHJpbmcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbmltcG9ydCB7IEVSUl9JTlZBTElEX1VSSSB9IGZyb20gXCIuL2Vycm9ycy50c1wiO1xuXG5leHBvcnQgY29uc3QgaGV4VGFibGUgPSBuZXcgQXJyYXkoMjU2KTtcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgaGV4VGFibGVbaV0gPSBcIiVcIiArICgoaSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpO1xufVxuXG4vLyBkZW5vLWZtdC1pZ25vcmVcbmV4cG9ydCBjb25zdCBpc0hleFRhYmxlID0gbmV3IEludDhBcnJheShbXG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDAgLSAxNVxuICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyAxNiAtIDMxXG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDMyIC0gNDdcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gNDggLSA2M1xuICAwLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyA2NCAtIDc5XG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDgwIC0gOTVcbiAgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gOTYgLSAxMTFcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gMTEyIC0gMTI3XG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDEyOCAuLi5cbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIC8vIC4uLiAyNTZcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlU3RyKFxuICBzdHI6IHN0cmluZyxcbiAgbm9Fc2NhcGVUYWJsZTogSW50OEFycmF5LFxuICBoZXhUYWJsZTogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBjb25zdCBsZW4gPSBzdHIubGVuZ3RoO1xuICBpZiAobGVuID09PSAwKSByZXR1cm4gXCJcIjtcblxuICBsZXQgb3V0ID0gXCJcIjtcbiAgbGV0IGxhc3RQb3MgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsZXQgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIC8vIEFTQ0lJXG4gICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICBpZiAobm9Fc2NhcGVUYWJsZVtjXSA9PT0gMSkgY29udGludWU7XG4gICAgICBpZiAobGFzdFBvcyA8IGkpIG91dCArPSBzdHIuc2xpY2UobGFzdFBvcywgaSk7XG4gICAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgICBvdXQgKz0gaGV4VGFibGVbY107XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGFzdFBvcyA8IGkpIG91dCArPSBzdHIuc2xpY2UobGFzdFBvcywgaSk7XG5cbiAgICAvLyBNdWx0aS1ieXRlIGNoYXJhY3RlcnMgLi4uXG4gICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgbGFzdFBvcyA9IGkgKyAxO1xuICAgICAgb3V0ICs9IGhleFRhYmxlWzB4YzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNmKV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgICAgIG91dCArPSBoZXhUYWJsZVsweGUwIHwgKGMgPj4gMTIpXSArXG4gICAgICAgIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNmKV0gK1xuICAgICAgICBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNmKV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gU3Vycm9nYXRlIHBhaXJcbiAgICArK2k7XG5cbiAgICAvLyBUaGlzIGJyYW5jaCBzaG91bGQgbmV2ZXIgaGFwcGVuIGJlY2F1c2UgYWxsIFVSTFNlYXJjaFBhcmFtcyBlbnRyaWVzXG4gICAgLy8gc2hvdWxkIGFscmVhZHkgYmUgY29udmVydGVkIHRvIFVTVlN0cmluZy4gQnV0LCBpbmNsdWRlZCBmb3JcbiAgICAvLyBjb21wbGV0aW9uJ3Mgc2FrZSBhbnl3YXkuXG4gICAgaWYgKGkgPj0gbGVuKSB0aHJvdyBuZXcgRVJSX0lOVkFMSURfVVJJKCk7XG5cbiAgICBjb25zdCBjMiA9IHN0ci5jaGFyQ29kZUF0KGkpICYgMHgzZmY7XG5cbiAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzZmYpIDw8IDEwKSB8IGMyKTtcbiAgICBvdXQgKz0gaGV4VGFibGVbMHhmMCB8IChjID4+IDE4KV0gK1xuICAgICAgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNmKV0gK1xuICAgICAgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M2YpXSArXG4gICAgICBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNmKV07XG4gIH1cbiAgaWYgKGxhc3RQb3MgPT09IDApIHJldHVybiBzdHI7XG4gIGlmIChsYXN0UG9zIDwgbGVuKSByZXR1cm4gb3V0ICsgc3RyLnNsaWNlKGxhc3RQb3MpO1xuICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGhleFRhYmxlLFxuICBlbmNvZGVTdHIsXG4gIGlzSGV4VGFibGUsXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxTQUFTLGVBQWUsUUFBUSxjQUFjO0FBRTlDLE9BQU8sTUFBTSxXQUFXLElBQUksTUFBTSxLQUFLO0FBQ3ZDLElBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsRUFBRztFQUM1QixRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVztBQUN4RTtBQUVBLGtCQUFrQjtBQUNsQixPQUFPLE1BQU0sYUFBYSxJQUFJLFVBQVU7RUFDdEM7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFDN0M7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7RUFBRztFQUFHO0VBQUc7Q0FDOUMsRUFBRTtBQUVILE9BQU8sU0FBUyxVQUNkLEdBQVcsRUFDWCxhQUF3QixFQUN4QixRQUFrQjtFQUVsQixNQUFNLE1BQU0sSUFBSSxNQUFNO0VBQ3RCLElBQUksUUFBUSxHQUFHLE9BQU87RUFFdEIsSUFBSSxNQUFNO0VBQ1YsSUFBSSxVQUFVO0VBRWQsSUFBSyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSztJQUM1QixJQUFJLElBQUksSUFBSSxVQUFVLENBQUM7SUFDdkIsUUFBUTtJQUNSLElBQUksSUFBSSxNQUFNO01BQ1osSUFBSSxhQUFhLENBQUMsRUFBRSxLQUFLLEdBQUc7TUFDNUIsSUFBSSxVQUFVLEdBQUcsT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTO01BQzNDLFVBQVUsSUFBSTtNQUNkLE9BQU8sUUFBUSxDQUFDLEVBQUU7TUFDbEI7SUFDRjtJQUVBLElBQUksVUFBVSxHQUFHLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUztJQUUzQyw0QkFBNEI7SUFDNUIsSUFBSSxJQUFJLE9BQU87TUFDYixVQUFVLElBQUk7TUFDZCxPQUFPLFFBQVEsQ0FBQyxPQUFRLEtBQUssRUFBRyxHQUFHLFFBQVEsQ0FBQyxPQUFRLElBQUksS0FBTTtNQUM5RDtJQUNGO0lBQ0EsSUFBSSxJQUFJLFVBQVUsS0FBSyxRQUFRO01BQzdCLFVBQVUsSUFBSTtNQUNkLE9BQU8sUUFBUSxDQUFDLE9BQVEsS0FBSyxHQUFJLEdBQy9CLFFBQVEsQ0FBQyxPQUFRLEFBQUMsS0FBSyxJQUFLLEtBQU0sR0FDbEMsUUFBUSxDQUFDLE9BQVEsSUFBSSxLQUFNO01BQzdCO0lBQ0Y7SUFDQSxpQkFBaUI7SUFDakIsRUFBRTtJQUVGLHNFQUFzRTtJQUN0RSw4REFBOEQ7SUFDOUQsNEJBQTRCO0lBQzVCLElBQUksS0FBSyxLQUFLLE1BQU0sSUFBSTtJQUV4QixNQUFNLEtBQUssSUFBSSxVQUFVLENBQUMsS0FBSztJQUUvQixVQUFVLElBQUk7SUFDZCxJQUFJLFVBQVUsQ0FBQyxBQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssS0FBTSxFQUFFO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDLE9BQVEsS0FBSyxHQUFJLEdBQy9CLFFBQVEsQ0FBQyxPQUFRLEFBQUMsS0FBSyxLQUFNLEtBQU0sR0FDbkMsUUFBUSxDQUFDLE9BQVEsQUFBQyxLQUFLLElBQUssS0FBTSxHQUNsQyxRQUFRLENBQUMsT0FBUSxJQUFJLEtBQU07RUFDL0I7RUFDQSxJQUFJLFlBQVksR0FBRyxPQUFPO0VBQzFCLElBQUksVUFBVSxLQUFLLE9BQU8sTUFBTSxJQUFJLEtBQUssQ0FBQztFQUMxQyxPQUFPO0FBQ1Q7QUFFQSxlQUFlO0VBQ2I7RUFDQTtFQUNBO0FBQ0YsRUFBRSJ9
// denoCacheMetadata=932640272695425758,11711217066965927137