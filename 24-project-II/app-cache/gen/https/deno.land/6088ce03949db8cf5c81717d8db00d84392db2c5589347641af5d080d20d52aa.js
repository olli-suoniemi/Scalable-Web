// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
export default function randomInt(max, min, cb) {
  if (typeof max === "number" && typeof min === "number") {
    [max, min] = [
      min,
      max
    ];
  }
  if (min === undefined) min = 0;
  else if (typeof min === "function") {
    cb = min;
    min = 0;
  }
  if (!Number.isSafeInteger(min) || typeof max === "number" && !Number.isSafeInteger(max)) {
    throw new Error("max or min is not a Safe Number");
  }
  if (max - min > Math.pow(2, 48)) {
    throw new RangeError("max - min should be less than 2^48!");
  }
  if (min >= max) {
    throw new Error("Min is bigger than Max!");
  }
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(randomNumber * (max - min + 1)) + min;
  if (cb) {
    cb(null, result);
    return;
  }
  return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2NyeXB0by9yYW5kb21JbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUludChtYXg6IG51bWJlcik6IG51bWJlcjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnQoXG4gIG1heDogbnVtYmVyLFxuICBjYjogKGVycjogRXJyb3IgfCBudWxsLCBuPzogbnVtYmVyKSA9PiB2b2lkLFxuKTogdm9pZDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUludChcbiAgbWluOiBudW1iZXIsXG4gIG1heDogbnVtYmVyLFxuICBjYjogKGVycjogRXJyb3IgfCBudWxsLCBuPzogbnVtYmVyKSA9PiB2b2lkLFxuKTogdm9pZDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tSW50KFxuICBtYXg6IG51bWJlcixcbiAgbWluPzogKChlcnI6IEVycm9yIHwgbnVsbCwgbj86IG51bWJlcikgPT4gdm9pZCkgfCBudW1iZXIsXG4gIGNiPzogKGVycjogRXJyb3IgfCBudWxsLCBuPzogbnVtYmVyKSA9PiB2b2lkLFxuKTogbnVtYmVyIHwgdm9pZCB7XG4gIGlmICh0eXBlb2YgbWF4ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBtaW4gPT09IFwibnVtYmVyXCIpIHtcbiAgICBbbWF4LCBtaW5dID0gW21pbiwgbWF4XTtcbiAgfVxuICBpZiAobWluID09PSB1bmRlZmluZWQpIG1pbiA9IDA7XG4gIGVsc2UgaWYgKHR5cGVvZiBtaW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNiID0gbWluO1xuICAgIG1pbiA9IDA7XG4gIH1cblxuICBpZiAoXG4gICAgIU51bWJlci5pc1NhZmVJbnRlZ2VyKG1pbikgfHxcbiAgICB0eXBlb2YgbWF4ID09PSBcIm51bWJlclwiICYmICFOdW1iZXIuaXNTYWZlSW50ZWdlcihtYXgpXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm1heCBvciBtaW4gaXMgbm90IGEgU2FmZSBOdW1iZXJcIik7XG4gIH1cblxuICBpZiAobWF4IC0gbWluID4gTWF0aC5wb3coMiwgNDgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJtYXggLSBtaW4gc2hvdWxkIGJlIGxlc3MgdGhhbiAyXjQ4IVwiKTtcbiAgfVxuXG4gIGlmIChtaW4gPj0gbWF4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWluIGlzIGJpZ2dlciB0aGFuIE1heCFcIik7XG4gIH1cblxuICBjb25zdCByYW5kb21CdWZmZXIgPSBuZXcgVWludDMyQXJyYXkoMSk7XG5cbiAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhyYW5kb21CdWZmZXIpO1xuXG4gIGNvbnN0IHJhbmRvbU51bWJlciA9IHJhbmRvbUJ1ZmZlclswXSAvICgweGZmZmZmZmZmICsgMSk7XG5cbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcblxuICBjb25zdCByZXN1bHQgPSBNYXRoLmZsb29yKHJhbmRvbU51bWJlciAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cbiAgaWYgKGNiKSB7XG4gICAgY2IobnVsbCwgcmVzdWx0KTtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQWExRSxlQUFlLFNBQVMsVUFDdEIsR0FBVyxFQUNYLEdBQXdELEVBQ3hELEVBQTRDO0VBRTVDLElBQUksT0FBTyxRQUFRLFlBQVksT0FBTyxRQUFRLFVBQVU7SUFDdEQsQ0FBQyxLQUFLLElBQUksR0FBRztNQUFDO01BQUs7S0FBSTtFQUN6QjtFQUNBLElBQUksUUFBUSxXQUFXLE1BQU07T0FDeEIsSUFBSSxPQUFPLFFBQVEsWUFBWTtJQUNsQyxLQUFLO0lBQ0wsTUFBTTtFQUNSO0VBRUEsSUFDRSxDQUFDLE9BQU8sYUFBYSxDQUFDLFFBQ3RCLE9BQU8sUUFBUSxZQUFZLENBQUMsT0FBTyxhQUFhLENBQUMsTUFDakQ7SUFDQSxNQUFNLElBQUksTUFBTTtFQUNsQjtFQUVBLElBQUksTUFBTSxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSztJQUMvQixNQUFNLElBQUksV0FBVztFQUN2QjtFQUVBLElBQUksT0FBTyxLQUFLO0lBQ2QsTUFBTSxJQUFJLE1BQU07RUFDbEI7RUFFQSxNQUFNLGVBQWUsSUFBSSxZQUFZO0VBRXJDLE9BQU8sZUFBZSxDQUFDO0VBRXZCLE1BQU0sZUFBZSxZQUFZLENBQUMsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDO0VBRXRELE1BQU0sS0FBSyxJQUFJLENBQUM7RUFDaEIsTUFBTSxLQUFLLEtBQUssQ0FBQztFQUVqQixNQUFNLFNBQVMsS0FBSyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sTUFBTSxDQUFDLEtBQUs7RUFFNUQsSUFBSSxJQUFJO0lBQ04sR0FBRyxNQUFNO0lBQ1Q7RUFDRjtFQUVBLE9BQU87QUFDVCJ9
// denoCacheMetadata=11751026114104197095,804952398952572801