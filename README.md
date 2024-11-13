# `napi-gif-encoder`

![https://github.com/gomander/napi-gif-encoder/actions](https://github.com/gomander/napi-gif-encoder/workflows/CI/badge.svg)

> A faster GIF Encoder for Node JS using Rust

This library is a fork of [@tyrone-sudeium/napi-gif-encoder](https://github.com/tyrone-sudeium/napi-gif-encoder).  
I made this fork because the original is not currently being maintained, and I needed a new feature added.

## Install

```sh
npm install @gomander/napi-gif-encoder
```

## Support matrix

### Operating Systems

| Linux x64/aarch64 | Windows x64 |
| ----------------- | ----------- |
| ✓                 | ✓           |

### NodeJS

Theoretically, any version of Node that supports N-API should work. The CI is
validated against LTS versions of Node:

| Node 18 | Node 20 | Node 22 |
| ------- | ------- | ------- |
| ✓       | ✓       | ✓       |

### Building

If you are using this as a dependency, since we use N-API, you don't
need to build anything! However, if you want to tinker with this code
or submit a PR, read below.

## Developing

- Install latest `Rust`. Suggest using [rustup](https://rustup.rs/). If on Windows, use WSL for an easier time.
- Install `NodeJS@18+`. LTS versions suggested.
- Install `yarn@1.x`.

You can then compile the rust code with:

```sh
yarn build
```

After `yarn build/npm run build` command, you can see
`napi-gif-encoder.[win32|linux].node` file in project root.
This is the native addon built from [lib.rs](./src/lib.rs).

## Try out using sample project

- `yarn`
- `yarn build`
- `cd sample`
- `yarn`
- `node .`

You'll then see `output.gif`, which was encoded using the rust encoder.

You can compare this to a Node-based GIF encoder by running `node . --js`.

### Performance

This data is a ten-run average of the time it took to encode the sample project on a Ryzen 7 7800X3D.  
Historical data from the original author also suggests that this library scales better with more cores than Node-based GIF encoders.

| Encoder                                                         | Time  |
| --------------------------------------------------------------- | ----- |
| [`gif-encoder-2`](https://github.com/benjaminadk/gif-encoder-2) | 692ms |
| `napi-gif-encoder`                                              | 250ms |
