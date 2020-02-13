import { Component } from 'react'
import HexMapEditorContainer from '../containers/HexMapEditorContainer'

class TileMap extends Component<{}, {}> {
  render() {
    return <HexMapEditorContainer url="ws://localhost:8080/api/map" />
  }
}

export default TileMap
