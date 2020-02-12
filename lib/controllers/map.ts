import { Op } from 'sequelize'

import { Hex, Map } from '../models'
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
    async (_req: any, _res: any, _ws: any, message: { mapId: number }) => {
      const maps = await Hex.findAll({
        order: ['column', 'row'],
        include: [
          {
            as: 'map',
            model: Map,
            where: {
              id: {
                [Op.eq]: message.mapId
              }
            }
          }
        ]
      })

      if (!maps || maps.length === 0) {
        return []
      }

      return await serializer.serialize(maps)
    }
  )

  return router
}
