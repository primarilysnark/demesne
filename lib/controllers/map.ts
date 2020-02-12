import { Map } from '../models'
import { serializer } from '../sequelize'
import * as websocket from './websocket'

export function getRouter() {
  const router = websocket.Router('/')

  router.onMessage(
    'add-hex',
    async (_req: any, _res: any, _ws: any, message: object) => {
      return message
    }
  )

  router.onMessage(
    'sync',
    async (_req: any, _res: any, _ws: any, message: object) => {
      const maps = await Map.findAll({
        order: [['updatedAt', 'DESC']]
      })

      if (!maps) {
        return []
      }

      return await serializer.serialize(maps)
    }
  )

  return router
}
