# CRC32 implementation

## Source and public identity

[beyond.json](../beyond.json) selects [src/package.json](../src/package.json). The main module [manifest](../src/modules/main/module.json) declares `@beyond-js/crc32/main`, and [the source](../src/modules/main/index.ts) exports the marked function `crc32`, so the generated public module exposes it. There is no CommonJS root export.

## Algorithm and input conversion

`crc32(input: Buffer | string): number` keeps a Buffer as given and converts a string with `Buffer.from(input, 'binary')`, the Latin-1 conversion: an ASCII string has the same bytes in both encodings, a character between U+0080 and U+00FF is one byte, a character above U+00FF keeps its low byte only. The accumulator starts at `-1`, each byte is folded through the 256-entry reflected table of polynomial `0xEDB88320`, and the final XOR with `-1` and `>>> 0` make the result unsigned. The table is parsed once when the module evaluates.

The result is a number, not a Buffer or a hexadecimal string; an empty input is `0`; `"123456789"` is `0xCBF43926`. There is no streaming, seed or polynomial option. An input that `Buffer.from` does not accept (`undefined`, a number, a plain object) throws the platform's `TypeError`.

## Runtime environment

The implementation references the global `Buffer` and nothing else: no imports, I/O, lifecycle or shared mutable state. Node supplies `Buffer`; the `web` distribution of the manifest does not, and a browser needs a compatible implementation.

## Build and validation

The [module tsconfig](../src/modules/main/tsconfig.json) enables `noImplicitAny` and Node types. The tests under [tests/](../tests/README.md) import the compiled public module; [validation](validation.md) maps each contract to its test. Changing the string conversion to UTF-8 would change every existing non-ASCII checksum, which is why the Latin-1 behaviour is kept and documented.
