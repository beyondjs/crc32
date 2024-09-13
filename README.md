# @beyond-js/crc32

A fast and efficient CRC32 (Cyclic Redundancy Check) implementation for Node.js and browser environments.

## Installation

```bash
npm install @beyond-js/crc32
```

## Usage

```javascript
const crc32 = require('@beyond-js/crc32');

// Calculate CRC32 for a string
const result1 = crc32('Hello, World!');
console.log(result1); // Outputs a 32-bit unsigned integer

// Calculate CRC32 for a Buffer
const buffer = Buffer.from('Hello, World!', 'utf8');
const result2 = crc32(buffer);
console.log(result2); // Outputs the same 32-bit unsigned integer
```

## API

The module exports a single function:

```javascript
function crc32(input: string | Buffer): number
```

-   `input`: The input data. Can be a string or a Buffer.
-   Returns: A 32-bit unsigned integer representing the CRC32 checksum.

## Features

-   Works with both strings and Buffers
-   Optimized for performance using a pre-computed lookup table
-   Compatible with Node.js and browser environments (when bundled)

## License

MIT © [[BeyondJS](https://beyondjs)]
