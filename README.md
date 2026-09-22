# @beyond-js/crc32

An unsigned 32-bit CRC over the bytes of a Buffer, or of a string converted with Node's `binary` (Latin-1) encoding. Synchronous, table-driven, and exported by the public module `@beyond-js/crc32/main`.

```ts
import { crc32 } from '@beyond-js/crc32/main';

crc32('123456789');                       // 0xcbf43926, the standard check value
crc32(Buffer.from('héllo', 'utf8'));      // the bytes as given
crc32('héllo');                           // Latin-1 bytes: different from the UTF-8 checksum
```

Give a Buffer when the encoding matters: a string character above U+00FF keeps its low byte only. The result is a number in the unsigned 32-bit range, zero for an empty input; an input that `Buffer.from` does not accept throws a `TypeError`. A checksum is a compact change identifier, not a collision-free identity and not a cryptographic integrity value.

Read [implementation and compatibility](docs/architecture.md) and [validation](docs/validation.md). The code requires the global `Buffer`; a browser needs a compatible implementation. [Source package](src/package.json) and [workspace configuration](beyond.json) describe the Beyond build.
