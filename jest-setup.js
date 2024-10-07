global.afterEach(() => {
  // Clear down JSDOM document after each test
  document.getElementsByTagName('html')[0].innerHTML = ''
})

const { TextDecoder, TextEncoder, ReadableStream } = require('node:util')
Object.assign(global, { TextDecoder, TextEncoder })
Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream }
})
