Put files into ./input/original

To install dependencies:

```bash
bun install
or 
npm install
```

To run:

```bash
bun run gen
or
npm run gen
```


### Authorize

Grab application keyId and KeyValue from backblaze

```bash
b2 account authorize <keyId> <keyValue>
```

then:

```bash
bun run sync
or
npm run sync
```

