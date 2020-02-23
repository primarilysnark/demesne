import HexMapEditorContainer from '../containers/HexMapEditorContainer'

import * as constants from '../constants'
const env =
  (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
  'development'

function TileMap() {
  return <HexMapEditorContainer url={`${constants[env].api.baseUri}/api/map`} />
}

export default TileMap
