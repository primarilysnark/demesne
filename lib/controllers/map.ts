import * as websocket from './websocket'

export function getRouter() {
  const router = websocket.Router('/')

  router.onMessage(
    'add-hex',
    async (_req: any, _res: any, _ws: any, message: object) => {
      return message
    }
  )

  return router
}
