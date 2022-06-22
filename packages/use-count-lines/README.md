# Use Count Lines

[![NPM](https://badgen.net/npm/v/use-count-lines)](https://www.npmjs.com/package/use-count-lines)

Get the amount of lines of an element.

## Install

```
npm i use-count-lines
```

## Simple Usage

Attach the ref to the element you want to count the lines

**Demo:**

See the [storybook](https://62a2ab92144ec0d56406767f-xvcyjtgali.chromatic.com/) for an example with multiple texts

Or

[![Edit Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-count-lines-7cbybk)

**Example.js**

```javascript
import { useCountLines } from 'use-count-lines';

export default function ExampleComponent({ children }) {
  const { ref, lines } = useCountLines();

  return <h1 ref={ref}>This header has {lines}</h1>;
}
```

## Usage with custom ref

If you already have a ref declared, you can pass to the hook and it will use that element.

```javascript
import React from "react"
import { useCountLines } from "use-count-lines"

export default function ExampleComponent({ children }) {
  const customRef = useRef():
  const { lines } = useCountLines(customRef);

  return <h1 ref={ref}>This header has {lines}</h1>
}
```

## Other available info

The useCountLines hook also returns other info that might be useful

```javascript
import React from 'react';
import { useCountLines } from 'use-count-lines';

export default function ExampleComponent({ children }) {
  const {
    ref,
    lines,
    textHeight,
    naturalHeightWithOneLine,
    firstLineHeight,
    additionalLineHeight,
  } = useCountLines();

  return <h1 ref={ref}>This header has {lines}</h1>;
}
```
