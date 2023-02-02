import type { Stream as NodeStream } from 'stream'

export class Stream<T> extends EventTarget implements NodeStream {
  private data: string | Uint8Array | undefined
  private writer: WritableStreamDefaultWriter<T> | undefined

  constructor({
    data,
    writer,
  }: {
    data?: string | Uint8Array | undefined
    writer?: WritableStreamDefaultWriter<T> | undefined
  }) {
    super()

    this.data = data
    this.writer = writer
  }

  emit(event: string, data: any): boolean {
    console.log('emit', event, data)

    this.dispatchEvent(new Event(event))

    if (event === 'pipe') {
      data.on('data', this.onData.bind(this))
      data.on('end', this.onEnd.bind(this))
    }

    return true
  }

  onData(chunk: T) {
    if (!this.writer) {
      throw new Error()
    }

    this.writer.write(chunk)
  }

  onEnd() {
    if (!this.writer) {
      throw new Error()
    }

    this.emit('finish', undefined)
    this.writer.close()
  }

  end() {}

  on(eventName: string | symbol, listener: (...args: any[]) => void): this {
    console.log('on', eventName)

    this.addEventListener(eventName.toString(), listener)

    return this
  }

  once(eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.addEventListener(eventName.toString(), listener)

    return this
  }

  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    this.addEventListener(eventName.toString(), listener)

    return this
  }

  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    this.removeEventListener(eventName.toString(), listener)

    return this
  }

  eventNames(): (string | symbol)[] {
    return []
  }

  removeAllListeners(event?: string | symbol | undefined): this {
    return this
  }

  off(eventName: string | symbol, listener: (...args: any[]) => void): this {
    return this
  }

  setMaxListeners(n: number): this {
    return this
  }

  getMaxListeners(): number {
    return -1
  }

  listeners(eventName: string | symbol): Function[] {
    return []
  }

  rawListeners(eventName: string | symbol): Function[] {
    return []
  }

  listenerCount(eventName: string | symbol): number {
    return -1
  }

  prependListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    return this
  }

  prependOnceListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    return this
  }

  pipe<T extends NodeJS.WritableStream>(
    destination: T,
    options?: { end?: boolean | undefined } | undefined,
  ): T {
    console.log('pipe', destination)

    if (!this.data) {
      throw new Error()
    }

    destination.write(this.data)
    destination.end()

    return destination
  }
}

export function toReadableStream<T>() {
  const { readable, writable } = new TransformStream<T>()

  return {
    from: new Stream<T>({ writer: writable.getWriter() }),
    to: readable,
  }
}
