// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
import { nextTick } from "./_next_tick.ts";
import { customPromisifyArgs } from "./internal/util.mjs";
import { validateCallback, validateOneOf, validateString } from "./internal/validators.mjs";
import { isIP } from "./internal/net.ts";
import { emitInvalidHostnameWarning, getDefaultVerbatim, validateHints } from "./_dns/_utils.ts";
import { dnsException } from "./internal/errors.ts";
import { AI_ADDRCONFIG as ADDRCONFIG, getaddrinfo, GetAddrInfoReqWrap } from "./internal_binding/cares_wrap.ts";
import { toASCII } from "./internal/idna.ts";
function _isLookupOptions(options) {
  return options !== null && typeof options === "object";
}
function _isLookupCallback(options) {
  return typeof options === "function";
}
function onlookup(code, addresses) {
  if (code) {
    return this.callback(dnsException(code, "getaddrinfo", this.hostname));
  }
  this.callback(null, addresses[0], this.family || isIP(addresses[0]));
}
function onlookupall(code, addresses) {
  if (code) {
    return this.callback(dnsException(code, "getaddrinfo", this.hostname));
  }
  const family = this.family;
  const parsedAddresses = [];
  for(let i = 0; i < addresses.length; i++){
    const addr = addresses[i];
    parsedAddresses[i] = {
      address: addr,
      family: family || isIP(addr)
    };
  }
  this.callback(null, parsedAddresses);
}
function lookup(hostname, options, callback) {
  let hints = 0;
  let family = -1;
  let all = false;
  let verbatim = getDefaultVerbatim();
  // Parse arguments
  if (hostname) {
    validateString(hostname, "hostname");
  }
  if (_isLookupCallback(options)) {
    callback = options;
    family = 0;
  } else {
    validateCallback(callback);
    if (_isLookupOptions(options)) {
      hints = options.hints >>> 0;
      family = options.family >>> 0;
      all = options.all === true;
      if (typeof options.verbatim === "boolean") {
        verbatim = options.verbatim === true;
      }
      validateHints(hints);
    } else {
      family = options >>> 0;
    }
  }
  validateOneOf(family, "family", [
    0,
    4,
    6
  ]);
  if (!hostname) {
    emitInvalidHostnameWarning(hostname);
    if (all) {
      nextTick(callback, null, []);
    } else {
      nextTick(callback, null, null, family === 6 ? 6 : 4);
    }
    return {};
  }
  const matchedFamily = isIP(hostname);
  if (matchedFamily) {
    if (all) {
      nextTick(callback, null, [
        {
          address: hostname,
          family: matchedFamily
        }
      ]);
    } else {
      nextTick(callback, null, hostname, matchedFamily);
    }
    return {};
  }
  const req = new GetAddrInfoReqWrap();
  req.callback = callback;
  req.family = family;
  req.hostname = hostname;
  req.oncomplete = all ? onlookupall : onlookup;
  getaddrinfo(req, toASCII(hostname), family, hints, verbatim);
  return req;
}
Object.defineProperty(lookup, customPromisifyArgs, {
  value: [
    "address",
    "family"
  ],
  enumerable: false
});
// ERROR CODES
export const NODATA = "ENODATA";
export const FORMERR = "EFORMERR";
export const SERVFAIL = "ESERVFAIL";
export const NOTFOUND = "ENOTFOUND";
export const NOTIMP = "ENOTIMP";
export const REFUSED = "EREFUSED";
export const BADQUERY = "EBADQUERY";
export const BADNAME = "EBADNAME";
export const BADFAMILY = "EBADFAMILY";
export const BADRESP = "EBADRESP";
export const CONNREFUSED = "ECONNREFUSED";
export const TIMEOUT = "ETIMEOUT";
export const EOF = "EOF";
export const FILE = "EFILE";
export const NOMEM = "ENOMEM";
export const DESTRUCTION = "EDESTRUCTION";
export const BADSTR = "EBADSTR";
export const BADFLAGS = "EBADFLAGS";
export const NONAME = "ENONAME";
export const BADHINTS = "EBADHINTS";
export const NOTINITIALIZED = "ENOTINITIALIZED";
export const LOADIPHLPAPI = "ELOADIPHLPAPI";
export const ADDRGETNETWORKPARAMS = "EADDRGETNETWORKPARAMS";
export const CANCELLED = "ECANCELLED";
export { ADDRCONFIG, lookup };
export default {
  ADDRCONFIG,
  lookup,
  NODATA,
  FORMERR,
  SERVFAIL,
  NOTFOUND,
  NOTIMP,
  REFUSED,
  BADQUERY,
  BADNAME,
  BADFAMILY,
  BADRESP,
  CONNREFUSED,
  TIMEOUT,
  EOF,
  FILE,
  NOMEM,
  DESTRUCTION,
  BADSTR,
  BADFLAGS,
  NONAME,
  BADHINTS,
  NOTINITIALIZED,
  LOADIPHLPAPI,
  ADDRGETNETWORKPARAMS,
  CANCELLED
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvZG5zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHsgbmV4dFRpY2sgfSBmcm9tIFwiLi9fbmV4dF90aWNrLnRzXCI7XG5pbXBvcnQgeyBjdXN0b21Qcm9taXNpZnlBcmdzIH0gZnJvbSBcIi4vaW50ZXJuYWwvdXRpbC5tanNcIjtcbmltcG9ydCB7XG4gIHZhbGlkYXRlQ2FsbGJhY2ssXG4gIHZhbGlkYXRlT25lT2YsXG4gIHZhbGlkYXRlU3RyaW5nLFxufSBmcm9tIFwiLi9pbnRlcm5hbC92YWxpZGF0b3JzLm1qc1wiO1xuaW1wb3J0IHsgaXNJUCB9IGZyb20gXCIuL2ludGVybmFsL25ldC50c1wiO1xuaW1wb3J0IHtcbiAgZW1pdEludmFsaWRIb3N0bmFtZVdhcm5pbmcsXG4gIGdldERlZmF1bHRWZXJiYXRpbSxcbiAgdmFsaWRhdGVIaW50cyxcbn0gZnJvbSBcIi4vX2Rucy9fdXRpbHMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXJybm9FeGNlcHRpb24gfSBmcm9tIFwiLi9pbnRlcm5hbC9lcnJvcnMudHNcIjtcbmltcG9ydCB7IGRuc0V4Y2VwdGlvbiB9IGZyb20gXCIuL2ludGVybmFsL2Vycm9ycy50c1wiO1xuaW1wb3J0IHtcbiAgQUlfQUREUkNPTkZJRyBhcyBBRERSQ09ORklHLFxuICBnZXRhZGRyaW5mbyxcbiAgR2V0QWRkckluZm9SZXFXcmFwLFxufSBmcm9tIFwiLi9pbnRlcm5hbF9iaW5kaW5nL2NhcmVzX3dyYXAudHNcIjtcbmltcG9ydCB7IHRvQVNDSUkgfSBmcm9tIFwiLi9pbnRlcm5hbC9pZG5hLnRzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9va3VwT3B0aW9ucyB7XG4gIGZhbWlseT86IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgaGludHM/OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGFsbD86IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIHZlcmJhdGltPzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb29rdXBPbmVPcHRpb25zIGV4dGVuZHMgTG9va3VwT3B0aW9ucyB7XG4gIGFsbD86IGZhbHNlIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvb2t1cEFsbE9wdGlvbnMgZXh0ZW5kcyBMb29rdXBPcHRpb25zIHtcbiAgYWxsOiB0cnVlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvb2t1cEFkZHJlc3Mge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGZhbWlseTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBfaXNMb29rdXBPcHRpb25zKG9wdGlvbnM6IHVua25vd24pOiBvcHRpb25zIGlzIExvb2t1cE9wdGlvbnMge1xuICByZXR1cm4gb3B0aW9ucyAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIjtcbn1cblxuZnVuY3Rpb24gX2lzTG9va3VwQ2FsbGJhY2soXG4gIG9wdGlvbnM6IHVua25vd24sXG4pOiBvcHRpb25zIGlzICguLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQge1xuICByZXR1cm4gdHlwZW9mIG9wdGlvbnMgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZnVuY3Rpb24gb25sb29rdXAoXG4gIHRoaXM6IEdldEFkZHJJbmZvUmVxV3JhcCxcbiAgY29kZTogbnVtYmVyIHwgbnVsbCxcbiAgYWRkcmVzc2VzOiBzdHJpbmdbXSxcbikge1xuICBpZiAoY29kZSkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGRuc0V4Y2VwdGlvbihjb2RlLCBcImdldGFkZHJpbmZvXCIsIHRoaXMuaG9zdG5hbWUpKTtcbiAgfVxuXG4gIHRoaXMuY2FsbGJhY2sobnVsbCwgYWRkcmVzc2VzWzBdLCB0aGlzLmZhbWlseSB8fCBpc0lQKGFkZHJlc3Nlc1swXSkpO1xufVxuXG5mdW5jdGlvbiBvbmxvb2t1cGFsbChcbiAgdGhpczogR2V0QWRkckluZm9SZXFXcmFwLFxuICBjb2RlOiBudW1iZXIgfCBudWxsLFxuICBhZGRyZXNzZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGlmIChjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZG5zRXhjZXB0aW9uKGNvZGUsIFwiZ2V0YWRkcmluZm9cIiwgdGhpcy5ob3N0bmFtZSkpO1xuICB9XG5cbiAgY29uc3QgZmFtaWx5ID0gdGhpcy5mYW1pbHk7XG4gIGNvbnN0IHBhcnNlZEFkZHJlc3NlcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYWRkciA9IGFkZHJlc3Nlc1tpXTtcbiAgICBwYXJzZWRBZGRyZXNzZXNbaV0gPSB7XG4gICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgZmFtaWx5OiBmYW1pbHkgfHwgaXNJUChhZGRyKSxcbiAgICB9O1xuICB9XG5cbiAgdGhpcy5jYWxsYmFjayhudWxsLCBwYXJzZWRBZGRyZXNzZXMpO1xufVxuXG50eXBlIExvb2t1cENhbGxiYWNrID0gKFxuICBlcnI6IEVycm5vRXhjZXB0aW9uIHwgbnVsbCxcbiAgYWRkcmVzc09yQWRkcmVzc2VzPzogc3RyaW5nIHwgTG9va3VwQWRkcmVzc1tdIHwgbnVsbCxcbiAgZmFtaWx5PzogbnVtYmVyLFxuKSA9PiB2b2lkO1xuXG4vLyBFYXN5IEROUyBBL0FBQUEgbG9vayB1cFxuLy8gbG9va3VwKGhvc3RuYW1lLCBbb3B0aW9ucyxdIGNhbGxiYWNrKVxuZnVuY3Rpb24gbG9va3VwKFxuICBob3N0bmFtZTogc3RyaW5nLFxuICBmYW1pbHk6IG51bWJlcixcbiAgY2FsbGJhY2s6IChcbiAgICBlcnI6IEVycm5vRXhjZXB0aW9uIHwgbnVsbCxcbiAgICBhZGRyZXNzOiBzdHJpbmcsXG4gICAgZmFtaWx5OiBudW1iZXIsXG4gICkgPT4gdm9pZCxcbik6IEdldEFkZHJJbmZvUmVxV3JhcCB8IFJlY29yZDxzdHJpbmcsIG5ldmVyPjtcbmZ1bmN0aW9uIGxvb2t1cChcbiAgaG9zdG5hbWU6IHN0cmluZyxcbiAgb3B0aW9uczogTG9va3VwT25lT3B0aW9ucyxcbiAgY2FsbGJhY2s6IChcbiAgICBlcnI6IEVycm5vRXhjZXB0aW9uIHwgbnVsbCxcbiAgICBhZGRyZXNzOiBzdHJpbmcsXG4gICAgZmFtaWx5OiBudW1iZXIsXG4gICkgPT4gdm9pZCxcbik6IEdldEFkZHJJbmZvUmVxV3JhcCB8IFJlY29yZDxzdHJpbmcsIG5ldmVyPjtcbmZ1bmN0aW9uIGxvb2t1cChcbiAgaG9zdG5hbWU6IHN0cmluZyxcbiAgb3B0aW9uczogTG9va3VwQWxsT3B0aW9ucyxcbiAgY2FsbGJhY2s6IChlcnI6IEVycm5vRXhjZXB0aW9uIHwgbnVsbCwgYWRkcmVzc2VzOiBMb29rdXBBZGRyZXNzW10pID0+IHZvaWQsXG4pOiBHZXRBZGRySW5mb1JlcVdyYXAgfCBSZWNvcmQ8c3RyaW5nLCBuZXZlcj47XG5mdW5jdGlvbiBsb29rdXAoXG4gIGhvc3RuYW1lOiBzdHJpbmcsXG4gIG9wdGlvbnM6IExvb2t1cE9wdGlvbnMsXG4gIGNhbGxiYWNrOiAoXG4gICAgZXJyOiBFcnJub0V4Y2VwdGlvbiB8IG51bGwsXG4gICAgYWRkcmVzczogc3RyaW5nIHwgTG9va3VwQWRkcmVzc1tdLFxuICAgIGZhbWlseTogbnVtYmVyLFxuICApID0+IHZvaWQsXG4pOiBHZXRBZGRySW5mb1JlcVdyYXAgfCBSZWNvcmQ8c3RyaW5nLCBuZXZlcj47XG5mdW5jdGlvbiBsb29rdXAoXG4gIGhvc3RuYW1lOiBzdHJpbmcsXG4gIGNhbGxiYWNrOiAoXG4gICAgZXJyOiBFcnJub0V4Y2VwdGlvbiB8IG51bGwsXG4gICAgYWRkcmVzczogc3RyaW5nLFxuICAgIGZhbWlseTogbnVtYmVyLFxuICApID0+IHZvaWQsXG4pOiBHZXRBZGRySW5mb1JlcVdyYXAgfCBSZWNvcmQ8c3RyaW5nLCBuZXZlcj47XG5mdW5jdGlvbiBsb29rdXAoXG4gIGhvc3RuYW1lOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHVua25vd24sXG4gIGNhbGxiYWNrPzogdW5rbm93bixcbik6IEdldEFkZHJJbmZvUmVxV3JhcCB8IFJlY29yZDxzdHJpbmcsIG5ldmVyPiB7XG4gIGxldCBoaW50cyA9IDA7XG4gIGxldCBmYW1pbHkgPSAtMTtcbiAgbGV0IGFsbCA9IGZhbHNlO1xuICBsZXQgdmVyYmF0aW0gPSBnZXREZWZhdWx0VmVyYmF0aW0oKTtcblxuICAvLyBQYXJzZSBhcmd1bWVudHNcbiAgaWYgKGhvc3RuYW1lKSB7XG4gICAgdmFsaWRhdGVTdHJpbmcoaG9zdG5hbWUsIFwiaG9zdG5hbWVcIik7XG4gIH1cblxuICBpZiAoX2lzTG9va3VwQ2FsbGJhY2sob3B0aW9ucykpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgZmFtaWx5ID0gMDtcbiAgfSBlbHNlIHtcbiAgICB2YWxpZGF0ZUNhbGxiYWNrKGNhbGxiYWNrKTtcblxuICAgIGlmIChfaXNMb29rdXBPcHRpb25zKG9wdGlvbnMpKSB7XG4gICAgICBoaW50cyA9IG9wdGlvbnMuaGludHMhID4+PiAwO1xuICAgICAgZmFtaWx5ID0gb3B0aW9ucy5mYW1pbHkhID4+PiAwO1xuICAgICAgYWxsID0gb3B0aW9ucy5hbGwgPT09IHRydWU7XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy52ZXJiYXRpbSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgdmVyYmF0aW0gPSBvcHRpb25zLnZlcmJhdGltID09PSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0ZUhpbnRzKGhpbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFtaWx5ID0gKG9wdGlvbnMgYXMgbnVtYmVyKSA+Pj4gMDtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZU9uZU9mKGZhbWlseSwgXCJmYW1pbHlcIiwgWzAsIDQsIDZdKTtcblxuICBpZiAoIWhvc3RuYW1lKSB7XG4gICAgZW1pdEludmFsaWRIb3N0bmFtZVdhcm5pbmcoaG9zdG5hbWUpO1xuXG4gICAgaWYgKGFsbCkge1xuICAgICAgbmV4dFRpY2soY2FsbGJhY2sgYXMgTG9va3VwQ2FsbGJhY2ssIG51bGwsIFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dFRpY2soY2FsbGJhY2sgYXMgTG9va3VwQ2FsbGJhY2ssIG51bGwsIG51bGwsIGZhbWlseSA9PT0gNiA/IDYgOiA0KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCBtYXRjaGVkRmFtaWx5ID0gaXNJUChob3N0bmFtZSk7XG5cbiAgaWYgKG1hdGNoZWRGYW1pbHkpIHtcbiAgICBpZiAoYWxsKSB7XG4gICAgICBuZXh0VGljayhcbiAgICAgICAgY2FsbGJhY2sgYXMgTG9va3VwQ2FsbGJhY2ssXG4gICAgICAgIG51bGwsXG4gICAgICAgIFt7IGFkZHJlc3M6IGhvc3RuYW1lLCBmYW1pbHk6IG1hdGNoZWRGYW1pbHkgfV0sXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0VGljayhjYWxsYmFjayBhcyBMb29rdXBDYWxsYmFjaywgbnVsbCwgaG9zdG5hbWUsIG1hdGNoZWRGYW1pbHkpO1xuICAgIH1cblxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGNvbnN0IHJlcSA9IG5ldyBHZXRBZGRySW5mb1JlcVdyYXAoKTtcbiAgcmVxLmNhbGxiYWNrID0gY2FsbGJhY2sgYXMgTG9va3VwQ2FsbGJhY2s7XG4gIHJlcS5mYW1pbHkgPSBmYW1pbHk7XG4gIHJlcS5ob3N0bmFtZSA9IGhvc3RuYW1lO1xuICByZXEub25jb21wbGV0ZSA9IGFsbCA/IG9ubG9va3VwYWxsIDogb25sb29rdXA7XG5cbiAgZ2V0YWRkcmluZm8oXG4gICAgcmVxLFxuICAgIHRvQVNDSUkoaG9zdG5hbWUpLFxuICAgIGZhbWlseSxcbiAgICBoaW50cyxcbiAgICB2ZXJiYXRpbSxcbiAgKTtcblxuICByZXR1cm4gcmVxO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobG9va3VwLCBjdXN0b21Qcm9taXNpZnlBcmdzLCB7XG4gIHZhbHVlOiBbXCJhZGRyZXNzXCIsIFwiZmFtaWx5XCJdLFxuICBlbnVtZXJhYmxlOiBmYWxzZSxcbn0pO1xuXG4vLyBFUlJPUiBDT0RFU1xuZXhwb3J0IGNvbnN0IE5PREFUQSA9IFwiRU5PREFUQVwiO1xuZXhwb3J0IGNvbnN0IEZPUk1FUlIgPSBcIkVGT1JNRVJSXCI7XG5leHBvcnQgY29uc3QgU0VSVkZBSUwgPSBcIkVTRVJWRkFJTFwiO1xuZXhwb3J0IGNvbnN0IE5PVEZPVU5EID0gXCJFTk9URk9VTkRcIjtcbmV4cG9ydCBjb25zdCBOT1RJTVAgPSBcIkVOT1RJTVBcIjtcbmV4cG9ydCBjb25zdCBSRUZVU0VEID0gXCJFUkVGVVNFRFwiO1xuZXhwb3J0IGNvbnN0IEJBRFFVRVJZID0gXCJFQkFEUVVFUllcIjtcbmV4cG9ydCBjb25zdCBCQUROQU1FID0gXCJFQkFETkFNRVwiO1xuZXhwb3J0IGNvbnN0IEJBREZBTUlMWSA9IFwiRUJBREZBTUlMWVwiO1xuZXhwb3J0IGNvbnN0IEJBRFJFU1AgPSBcIkVCQURSRVNQXCI7XG5leHBvcnQgY29uc3QgQ09OTlJFRlVTRUQgPSBcIkVDT05OUkVGVVNFRFwiO1xuZXhwb3J0IGNvbnN0IFRJTUVPVVQgPSBcIkVUSU1FT1VUXCI7XG5leHBvcnQgY29uc3QgRU9GID0gXCJFT0ZcIjtcbmV4cG9ydCBjb25zdCBGSUxFID0gXCJFRklMRVwiO1xuZXhwb3J0IGNvbnN0IE5PTUVNID0gXCJFTk9NRU1cIjtcbmV4cG9ydCBjb25zdCBERVNUUlVDVElPTiA9IFwiRURFU1RSVUNUSU9OXCI7XG5leHBvcnQgY29uc3QgQkFEU1RSID0gXCJFQkFEU1RSXCI7XG5leHBvcnQgY29uc3QgQkFERkxBR1MgPSBcIkVCQURGTEFHU1wiO1xuZXhwb3J0IGNvbnN0IE5PTkFNRSA9IFwiRU5PTkFNRVwiO1xuZXhwb3J0IGNvbnN0IEJBREhJTlRTID0gXCJFQkFESElOVFNcIjtcbmV4cG9ydCBjb25zdCBOT1RJTklUSUFMSVpFRCA9IFwiRU5PVElOSVRJQUxJWkVEXCI7XG5leHBvcnQgY29uc3QgTE9BRElQSExQQVBJID0gXCJFTE9BRElQSExQQVBJXCI7XG5leHBvcnQgY29uc3QgQUREUkdFVE5FVFdPUktQQVJBTVMgPSBcIkVBRERSR0VUTkVUV09SS1BBUkFNU1wiO1xuZXhwb3J0IGNvbnN0IENBTkNFTExFRCA9IFwiRUNBTkNFTExFRFwiO1xuXG5leHBvcnQgeyBBRERSQ09ORklHLCBsb29rdXAgfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBBRERSQ09ORklHLFxuICBsb29rdXAsXG4gIE5PREFUQSxcbiAgRk9STUVSUixcbiAgU0VSVkZBSUwsXG4gIE5PVEZPVU5ELFxuICBOT1RJTVAsXG4gIFJFRlVTRUQsXG4gIEJBRFFVRVJZLFxuICBCQUROQU1FLFxuICBCQURGQU1JTFksXG4gIEJBRFJFU1AsXG4gIENPTk5SRUZVU0VELFxuICBUSU1FT1VULFxuICBFT0YsXG4gIEZJTEUsXG4gIE5PTUVNLFxuICBERVNUUlVDVElPTixcbiAgQkFEU1RSLFxuICBCQURGTEFHUyxcbiAgTk9OQU1FLFxuICBCQURISU5UUyxcbiAgTk9USU5JVElBTElaRUQsXG4gIExPQURJUEhMUEFQSSxcbiAgQUREUkdFVE5FVFdPUktQQVJBTVMsXG4gIENBTkNFTExFRCxcbn07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHNEQUFzRDtBQUN0RCxFQUFFO0FBQ0YsMEVBQTBF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
// denoCacheMetadata=893365378760372333,15797021485788241432