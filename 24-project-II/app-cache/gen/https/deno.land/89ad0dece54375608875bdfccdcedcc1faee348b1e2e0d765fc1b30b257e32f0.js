// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// This file contains C++ node globals accesed in internal binding calls
/**
 * Adapted from
 * https://github.com/nodejs/node/blob/3b72788afb7365e10ae1e97c71d1f60ee29f09f2/src/node.h#L728-L738
 */ export var Encodings;
(function(Encodings) {
  Encodings[Encodings["ASCII"] = 0] = "ASCII";
  Encodings[Encodings["UTF8"] = 1] = "UTF8";
  Encodings[Encodings["BASE64"] = 2] = "BASE64";
  Encodings[Encodings["UCS2"] = 3] = "UCS2";
  Encodings[Encodings["BINARY"] = 4] = "BINARY";
  Encodings[Encodings["HEX"] = 5] = "HEX";
  Encodings[Encodings["BUFFER"] = 6] = "BUFFER";
  Encodings[Encodings["BASE64URL"] = 7] = "BASE64URL";
  Encodings[Encodings["LATIN1"] = 4] = "LATIN1";
})(Encodings || (Encodings = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvaW50ZXJuYWxfYmluZGluZy9fbm9kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIEMrKyBub2RlIGdsb2JhbHMgYWNjZXNlZCBpbiBpbnRlcm5hbCBiaW5kaW5nIGNhbGxzXG5cbi8qKlxuICogQWRhcHRlZCBmcm9tXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi8zYjcyNzg4YWZiNzM2NWUxMGFlMWU5N2M3MWQxZjYwZWUyOWYwOWYyL3NyYy9ub2RlLmgjTDcyOC1MNzM4XG4gKi9cbmV4cG9ydCBlbnVtIEVuY29kaW5ncyB7XG4gIEFTQ0lJLCAvLyAwXG4gIFVURjgsIC8vIDFcbiAgQkFTRTY0LCAvLyAyXG4gIFVDUzIsIC8vIDNcbiAgQklOQVJZLCAvLyA0XG4gIEhFWCwgLy8gNVxuICBCVUZGRVIsIC8vIDZcbiAgQkFTRTY0VVJMLCAvLyA3XG4gIExBVElOMSA9IDQsIC8vIDQgPSBCSU5BUllcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUsd0VBQXdFO0FBRXhFOzs7Q0FHQztVQUNXOzs7Ozs7Ozs7O0dBQUEsY0FBQSJ9
// denoCacheMetadata=11610842654115630812,626102998863826015