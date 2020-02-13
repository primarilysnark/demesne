import { Component } from 'react'
import HexMap, { Hex, HexCoordinate } from '../utils/hex-map'
import Map from './HexMapGrid'
import TerrainModal from './TerrainModal'
import './HexMapEditor.module.scss'

interface HexMapEditorProps {
  addHex: (hex: Hex) => void
  isReady: boolean
  removeHex: (hex: HexCoordinate) => void
  map: HexMap
}

interface HexMapEditorState {
  terrainModal: {
    column: number | null
    isActive: boolean
    row: number | null
  }
}

class HexMapEditor extends Component<HexMapEditorProps, HexMapEditorState> {
  constructor(props: HexMapEditorProps) {
    super(props)

    this.state = {
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    }

    this.onAddTile = this.onAddTile.bind(this)
    this.closeTerrainModal = this.closeTerrainModal.bind(this)
    this.onClickTile = this.onClickTile.bind(this)
  }

  closeTerrainModal() {
    this.setState({
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    })
  }

  onClickTile(hex: HexCoordinate) {
    const { map, removeHex } = this.props

    if (!map.hasPopulatedHex(hex)) {
      return this.setState({
        terrainModal: {
          isActive: true,
          ...hex
        }
      })
    }

    return removeHex(hex)
  }

  onAddTile({ terrain }: { terrain: string }) {
    const { addHex } = this.props
    const { column, row } = this.state.terrainModal

    if (column === null || row === null) {
      return
    }

    addHex({ column, row, terrain })
    this.closeTerrainModal()
  }

  render() {
    const { map, isReady } = this.props
    const { terrainModal } = this.state

    return (
      <div className="grid">
        {isReady ? <Map map={map} onClickTile={this.onClickTile} /> : null}
        {terrainModal.isActive ? (
          <TerrainModal
            onCancel={this.closeTerrainModal}
            onSubmit={this.onAddTile}
          />
        ) : null}
      </div>
    )
  }
}

export default HexMapEditor
