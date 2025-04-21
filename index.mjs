import { loadBinding } from '@node-rs/helper'

export const { GIFEncoder } = loadBinding(import.meta.dirname, 'napi-gif-encoder', '@gomander/napi-gif-encoder')
