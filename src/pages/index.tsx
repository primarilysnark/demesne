import { Component } from 'react'
import HexMapEditorContainer from '../containers/HexMapEditorContainer'

import * as constants from '../constants'
const env =
  (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
  'development'

class TileMap extends Component<{}, {}> {
  render() {
    return (
      <HexMapEditorContainer
        url={`ws://${constants[env].api.baseUri}/api/map`}
      />
    )
  }
}

export default TileMap
