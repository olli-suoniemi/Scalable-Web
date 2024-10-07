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
// deno-lint-ignore-file
const { DTRACE_HTTP_CLIENT_REQUEST = (..._args)=>{}, DTRACE_HTTP_CLIENT_RESPONSE = (..._args)=>{}, DTRACE_HTTP_SERVER_REQUEST = (..._args)=>{}, DTRACE_HTTP_SERVER_RESPONSE = (..._args)=>{}, DTRACE_NET_SERVER_CONNECTION = (..._args)=>{}, DTRACE_NET_STREAM_END = (..._args)=>{} } = {};
export { DTRACE_HTTP_CLIENT_REQUEST, DTRACE_HTTP_CLIENT_RESPONSE, DTRACE_HTTP_SERVER_REQUEST, DTRACE_HTTP_SERVER_RESPONSE, DTRACE_NET_SERVER_CONNECTION, DTRACE_NET_STREAM_END };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvaW50ZXJuYWwvZHRyYWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gZGVuby1saW50LWlnbm9yZS1maWxlXG5cbmNvbnN0IHtcbiAgRFRSQUNFX0hUVFBfQ0xJRU5UX1JFUVVFU1QgPSAoLi4uX2FyZ3M6IGFueVtdKSA9PiB7fSxcbiAgRFRSQUNFX0hUVFBfQ0xJRU5UX1JFU1BPTlNFID0gKC4uLl9hcmdzOiBhbnlbXSkgPT4ge30sXG4gIERUUkFDRV9IVFRQX1NFUlZFUl9SRVFVRVNUID0gKC4uLl9hcmdzOiBhbnlbXSkgPT4ge30sXG4gIERUUkFDRV9IVFRQX1NFUlZFUl9SRVNQT05TRSA9ICguLi5fYXJnczogYW55W10pID0+IHt9LFxuICBEVFJBQ0VfTkVUX1NFUlZFUl9DT05ORUNUSU9OID0gKC4uLl9hcmdzOiBhbnlbXSkgPT4ge30sXG4gIERUUkFDRV9ORVRfU1RSRUFNX0VORCA9ICguLi5fYXJnczogYW55W10pID0+IHt9LFxufSA9IHt9O1xuXG5leHBvcnQge1xuICBEVFJBQ0VfSFRUUF9DTElFTlRfUkVRVUVTVCxcbiAgRFRSQUNFX0hUVFBfQ0xJRU5UX1JFU1BPTlNFLFxuICBEVFJBQ0VfSFRUUF9TRVJWRVJfUkVRVUVTVCxcbiAgRFRSQUNFX0hUVFBfU0VSVkVSX1JFU1BPTlNFLFxuICBEVFJBQ0VfTkVUX1NFUlZFUl9DT05ORUNUSU9OLFxuICBEVFJBQ0VfTkVUX1NUUkVBTV9FTkQsXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxzREFBc0Q7QUFDdEQsRUFBRTtBQUNGLDBFQUEwRTtBQUMxRSxnRUFBZ0U7QUFDaEUsc0VBQXNFO0FBQ3RFLHNFQUFzRTtBQUN0RSw0RUFBNEU7QUFDNUUscUVBQXFFO0FBQ3JFLHdCQUF3QjtBQUN4QixFQUFFO0FBQ0YsMEVBQTBFO0FBQzFFLHlEQUF5RDtBQUN6RCxFQUFFO0FBQ0YsMEVBQTBFO0FBQzFFLDZEQUE2RDtBQUM3RCw0RUFBNEU7QUFDNUUsMkVBQTJFO0FBQzNFLHdFQUF3RTtBQUN4RSw0RUFBNEU7QUFDNUUseUNBQXlDO0FBRXpDLHdCQUF3QjtBQUV4QixNQUFNLEVBQ0osNkJBQTZCLENBQUMsR0FBRyxTQUFrQixDQUFDLEVBQ3BELDhCQUE4QixDQUFDLEdBQUcsU0FBa0IsQ0FBQyxFQUNyRCw2QkFBNkIsQ0FBQyxHQUFHLFNBQWtCLENBQUMsRUFDcEQsOEJBQThCLENBQUMsR0FBRyxTQUFrQixDQUFDLEVBQ3JELCtCQUErQixDQUFDLEdBQUcsU0FBa0IsQ0FBQyxFQUN0RCx3QkFBd0IsQ0FBQyxHQUFHLFNBQWtCLENBQUMsRUFDaEQsR0FBRyxDQUFDO0FBRUwsU0FDRSwwQkFBMEIsRUFDMUIsMkJBQTJCLEVBQzNCLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDM0IsNEJBQTRCLEVBQzVCLHFCQUFxQixHQUNyQiJ9
// denoCacheMetadata=15545470417492378021,16019275771245431747