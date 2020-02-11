import { Component } from 'react'
import Grid from '../components/Grid'
import Map from '../utils/map'
import './ClipPath.module.scss'
import TerrainModal from '../components/TerrainModal'

interface TileMapState {
  map: Map,
  terrainModal: {
    column: number | null,
    isActive: boolean,
    row: number | null
  }
}

class TileMap extends Component<{}, TileMapState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      map: Map.fromArray([
        {
          column: 1,
          row: 1,
          terrain: 'water'
        }
      ]),
      terrainModal: {
        isActive: true,
        column: 1,
        row: 1
      },
    }

    this.onAddTile = this.onAddTile.bind(this)
    this.onCancelAddTile = this.onCancelAddTile.bind(this)
    this.onClickTile = this.onClickTile.bind(this)
  }

  onCancelAddTile() {
    this.setState({
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    })
  }

  onClickTile({ column, row }: { column: number, row: number }) {
    return this.setState(state => {
      const { map } = state

      if (!map.hasPopulatedHex({ column, row })) {
        return {
          map: state.map,
          terrainModal: {
            isActive: true,
            column,
            row
          }
        }
      }

      return {
        map: map.removeHex({ column, row }),
        terrainModal: state.terrainModal
      }
    })
  }

  onAddTile({ terrain }: { terrain: string }) {
    this.setState(state => ({
      map: state.map.addHex({
        column: state.terrainModal.column as number,
        row: state.terrainModal.row as number,
        terrain
      }),
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    }))
  }

  render() {
    const { map, terrainModal } = this.state

    return (
      <div className="grid">
        <Grid map={map} onClickTile={this.onClickTile} />
        {terrainModal.isActive ? (
          <TerrainModal onCancel={this.onCancelAddTile} onSubmit={this.onAddTile} />
        ) : null}
      </div>
    )
  }
}

export default TileMap
