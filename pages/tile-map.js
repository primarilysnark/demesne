import { Component } from 'react'
import Grid from '../components/Grid'
import Map from '../utils/map'
import './ClipPath.module.scss'
import TerrainModal from '../components/TerrainModal'

class TileMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      map: new Map({
        populatedHexes: [
          {
            column: 1,
            row: 1,
            terrain: 'water'
          }
        ]
      }),
      terrainModal: {
        isActive: true,
        column: 1,
        row: 1
      },
    }

    this.onAddTile = this.onAddTile.bind(this)
    this.onClickTile = this.onClickTile.bind(this)
  }

  onClickTile({ column, row }) {
    this.setState(state => {
      const { map } = state

      if (!map.hasPopulatedHex({ column, row })) {
        return {
          terrainModal: {
            isActive: true,
            column,
            row
          }
        }
      }

      return {
        map: map.removeHex({ column, row })
      }
    })
  }

  onAddTile({ terrain }) {
    this.setState(state => ({
      map: state.map.addHex({
        column: state.terrainModal.column,
        row: state.terrainModal.row,
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
          <TerrainModal onSubmit={this.onAddTile} />
        ) : null}
      </div>
    )
  }
}

export default TileMap
