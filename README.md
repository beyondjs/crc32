# @beyond-js/crc32

This Beyond-authored utility implements an unsigned 32-bit CRC checksum over Buffer bytes or binary/Latin-1 converted input. It is synchronous and uses a precomputed lookup table.

Read [implementation and compatibility](docs/architecture.md) for exact encoding, runtime requirements and build limits. The main module manifest declares `@beyond-js/crc32/main`, but its ordinary exported function lacks the Beyond public marker; verify generated exports before consuming it. A callable package-root CommonJS export is not defined here.

The code requires global Buffer, including in browser use. CRC32 is not a cryptographic or collision-free identifier. [Source package](src/package.json) and [workspace configuration](beyond.json) describe Beyond builds; no standalone npm test command is supplied.
