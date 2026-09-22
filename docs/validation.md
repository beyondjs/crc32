# Validation

| Contract or risk | Test | Observed |
| --- | --- | --- |
| The public module exposes `crc32` | `crc32` 1 | a function |
| The standard check vector; empty input | `crc32` 2 | `0xcbf43926` for a string and a Buffer; `0` for `''` and an empty Buffer |
| Unsigned 32-bit results | `crc32` 3 | in range; `'a'` is `0xe8b7be43` |
| A Buffer is read as its bytes, unchanged | `crc32` 4 | input intact; order matters |
| Latin-1 conversion of strings versus UTF-8 bytes | `crc32` 5 | `héllo` differs; ASCII equal; `€` keeps its low byte |
| Unacceptable inputs throw | `crc32` 6 | `TypeError` for `undefined`, a number, an object |
| Determinism; not an identity | `crc32` 7 | stable; a few inputs do not collide, which proves nothing general |

Inside the Beyond Suite, `node utils/validation/run.mjs crc32` prepares the server and runs the file; [the tests guide](../tests/README.md) states the prerequisites.

## Not established

- A browser with a `Buffer` implementation: only Node was exercised.
- Large inputs: linear cost, no measurement.
