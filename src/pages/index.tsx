import { Component } from 'react'
import HexMapEditorContainer from '../containers/HexMapEditorContainer'
import './Index.module.scss'

class TileMap extends Component<{}, {}> {
  render() {
    return <HexMapEditorContainer url="ws://localhost:8080/api/map" />
  }
}

export default TileMap
