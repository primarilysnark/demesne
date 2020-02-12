interface DemesneWebSocketEvent {
  type: string
  content: any
}

function tryParseJson(content: string): DemesneWebSocketEvent | false {
  try {
    const json = JSON.parse(content)

    if (!json || typeof json !== 'object') {
      return false
    }

    return json
  } catch (err) {
    return false
  }
}

export class DemesneWebSocket {
  public socket: WebSocket
  public url: string

  constructor(url: string, socket: WebSocket) {
    this.socket = socket
    this.url = url

    this.on = this.on.bind(this)
  }

  static connect(url: string) {
    return new DemesneWebSocket(url, new WebSocket(url))
  }

  close() {
    this.socket.close()
  }

  on(
    eventType: 'message',
    handler: (event: DemesneWebSocketEvent) => void
  ): void
  on(eventType: 'open' | 'close', handler: (event: Event) => void): void
  on(
    eventType: 'open' | 'close' | 'message',
    handler: ((event: DemesneWebSocketEvent) => void) | ((event: Event) => void)
  ): void {
    switch (eventType) {
      case 'open':
      case 'close':
        this.socket.addEventListener(eventType, event =>
          (handler as (event: Event) => void)(event)
        )
        break

      case 'message':
        this.socket.addEventListener('message', event => {
          if (!event.data) {
            throw new Error('Dataless message')
          }

          const content = tryParseJson(event.data)
          if (!content) {
            throw new Error('Invalid message format')
          }

          ;(handler as (event: DemesneWebSocketEvent) => void)(content)
        })
        break
    }
  }

  send(type: string, content: any) {
    this.socket.send(
      JSON.stringify({
        type,
        content
      })
    )
  }
}
