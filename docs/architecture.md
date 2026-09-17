# CRC32 implementation

CRC32 computes a deterministic unsigned 32-bit checksum over bytes. It is useful for compact non-security identifiers or accidental-change detection. It is not a cryptographic digest, authentication mechanism or collision-free cache key.

## Source and public identity

[beyond.json](../beyond.json) selects [src/package.json](../src/package.json). Its main module [manifest](../src/modules/main/module.json) declares the Beyond identity `@beyond-js/crc32/main`. [Source](../src/modules/main/index.ts) contains a precomputed table and an ordinary named TypeScript export `crc32`.

Unlike other Beyond public declarations, this function has no `/*bundle*/` marker. The declaration's presence therefore does not establish that a compiler selecting marked exports exposes it in the generated public module. Verify or explicitly repair that contract before using the built module. Neither the manifest nor the source defines a CommonJS root default export, so `require('@beyond-js/crc32')` returning a callable function is not the source contract documented here.

## Algorithm and input conversion

The source signature is `crc32(input: string | any): number`, effectively accepting any input at type level. At runtime it retains a Buffer or calls `Buffer.from(input, 'binary')`. It then starts an accumulator at -1, processes each byte with an unsigned right shift and lookup-table XOR, applies a final XOR with -1 and coerces unsigned with `>>> 0`.

The table has 256 parsed hexadecimal entries and uses the conventional reflected CRC32 polynomial represented by `0xEDB88320`. It is initialized once when the module evaluates; each call has a local accumulator. Processing is synchronous and linear in input length. Buffers are read without modification; strings and other accepted conversions allocate a Buffer. There is no streaming/incremental state API, seed parameter or custom polynomial option.

String conversion uses Node's binary/Latin-1 behavior, not UTF-8. For ASCII strings, a UTF-8 Buffer contains the same bytes. For non-ASCII input, byte sequences can differ: a string `é` converts to one byte under this path, whereas an explicitly UTF-8-encoded Buffer contains two bytes. Define the encoding when checksums must be shared across callers. Prefer an explicit Buffer for a known byte contract.

The result is a JavaScript number in the unsigned 32-bit range, not a Buffer or hexadecimal string. An empty input produces zero from the initial/final XOR. Convert the number explicitly when a caller needs hex formatting. Invalid inputs propagate Buffer conversion errors; there is no package-specific error type or fallback result.

## Runtime environment

The implementation directly references the global Buffer. It does not import a polyfill and does not use TextEncoder or Uint8Array-only browser APIs. Node supplies Buffer; a browser requires an explicit compatible Buffer implementation or a deliberate source adaptation. A web distribution in the manifest does not itself provide that global.

The source has no runtime imports, I/O, async lifecycle, listeners, mutable per-call shared state or destruction requirements. The manifest declares Kernel as a package dependency for Beyond packaging; this does not make Buffer available in a browser.

## Build and compatibility checks

The package manifest declares version 1.0.0, web and Node distributions at 1110/1111, with tsc for Node. [tsconfig](../src/modules/main/tsconfig.json) enables noImplicitAny and Node types. There is no npm script, standalone Node root entry or checked-in test suite. The [devcontainer](../.devcontainer/Dockerfile) uses Node 18/Beyond 1.2.4.

The [publish workflow](../.github/workflows/publish.yml) installs dependencies under src, requests an npm distribution and publishes its generated directory. That distribution is not explicitly present in the manifest; its success depends on compiler conventions and the export-marker contract. Treat the workflow as a build recipe requiring compatibility validation, not proof that a current published package matches this source.

Acceptance should verify generated public exports, empty/ASCII/byte-array inputs, a standard CRC test vector, bytes above 127, explicit UTF-8 versus binary string behavior, invalid input errors and browser Buffer provisioning. Preserve checksum encoding semantics when changing implementation: switching strings to UTF-8 changes existing non-ASCII identifiers even if the algorithm remains CRC32.
