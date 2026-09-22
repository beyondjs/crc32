# CRC32 package source

[package.json](package.json) defines the Beyond-authored `@beyond-js/crc32` package. [main/index.ts](modules/main/index.ts) computes an unsigned 32-bit checksum over Buffer bytes, converting a string as Latin-1, and exports it as the marked public function of `@beyond-js/crc32/main`.

See [implementation and compatibility](../docs/architecture.md) for the encoding, the Buffer requirement and the build.
