import { Component } from 'react'
import Grid from '../components/Grid'
import Map from '../utils/map'
import './ClipPath.module.scss'

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
      })
    }

    this.onClickTile = this.onClickTile.bind(this)
  }

  onClickTile({ column, row }) {
    this.setState(state => {
      const { map } = state

      if (!map.hasPopulatedHex({ column, row })) {
        return {
          map: map.addHex({
            column,
            row,
            terrain: 'water'
          })
        }
      }

      return {
        map: map.removeHex({ column, row })
      }
    })
  }

  render() {
    const { map } = this.state

    return (
      <div className="grid">
        <Grid map={map} onClickTile={this.onClickTile} />
      </div>
    )
  }
}

export default TileMap
