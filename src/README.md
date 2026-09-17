# CRC32 package source

[package.json](package.json) defines the Beyond-authored `@beyond-js/crc32` package. [main/index.ts](modules/main/index.ts) computes an unsigned 32-bit checksum using Buffer bytes and binary/Latin-1 conversion for string input.

See [implementation and compatibility](../docs/architecture.md) for public-export limitations, browser Buffer requirements, encoding and build expectations. Do not assume the package-root CommonJS API or UTF-8 string equivalence from older examples.
