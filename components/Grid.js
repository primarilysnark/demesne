import { Component } from 'react'
import { omit } from 'lodash'
import { hasAdjacencyToExistingHexes } from '../utils/hexes'
import Tile from '../components/tiles/Tile'
import './Grid.module.scss'

const ADJACENT_TERRAIN_TYPE = 'new'
const HIDDEN_TERRAIN_TYPE = 'hidden'

export default class Grid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      populatedHexes: {
        0: {
          0: "ocean"
        }
      }
    }

    this.addOrDeleteTerrain = this.addOrDeleteTerrain.bind(this)
  }

  addOrDeleteTerrain(x, y) {
    this.setState(state => {
      if (state.populatedHexes[x] && state.populatedHexes[x][y]) {
        if (Object.keys(state.populatedHexes[x]).length === 1) {
          return {
            ...state,
            populatedHexes: omit(state.populatedHexes, [x])
          }
        } else {
          return {
            ...state,
            populatedHexes: {
              ...state.populatedHexes,
              [x]: omit(state.populatedHexes[x], [y])
            }
          }
        }
      } else {
        return {
          ...state,
          populatedHexes: {
            ...state.populatedHexes,
            [x]: {
              ...state.populatedHexes[x],
              [y]: 'ocean'
            }
          }
        }
      }
    })
  }

  render() {
    const { populatedHexes } = this.state

    const populatedHexColumns = Object.keys(populatedHexes)
    const firstPopulatedColumnRows = Object.keys(populatedHexes[populatedHexColumns[0]])

    // Set starting minimum and maximum column and row coordinates
    const minimumPopulatedHexColumn = Math.min(...populatedHexColumns) - 1
    const maximumPopulatedHexColumn = Math.max(...populatedHexColumns)
    let minimumPopulatedHexRow = Math.min(...firstPopulatedColumnRows)
    let maximumPopulatedHexRow = Math.max(...firstPopulatedColumnRows)

    // Loop through all columns to determine minimum and maximum row coordinates
    populatedHexColumns.forEach(column => {
      const columnRows = Object.keys(populatedHexes[column])

      // Determine local minimum and maximum row
      const minimumColumnHexRow = Math.min(...columnRows)
      const maximumColumnHexRow = Math.max(...columnRows)

      // Update populated minimum and maximum if greater
      if (maximumColumnHexRow > maximumPopulatedHexRow) {
        maximumPopulatedHexRow = maximumColumnHexRow
      }

      if (minimumColumnHexRow < minimumPopulatedHexRow) {
        minimumPopulatedHexRow = minimumColumnHexRow
      }
    })

    // Update minimum and maximum rows to account for empty tiles
    minimumPopulatedHexRow = minimumPopulatedHexRow - 1
    maximumPopulatedHexRow = maximumPopulatedHexRow + 1

    // Calculate renderable region for tile grid
    const columnCountToRender = maximumPopulatedHexColumn - minimumPopulatedHexColumn + 2
    const rowCountToRender = maximumPopulatedHexRow - minimumPopulatedHexRow + 1

    let gridWidth = (columnCountToRender) * 85 + 42.5

    return (
      <div className="wrapper" style={{ width: `${gridWidth}px` }}>
        {Array.from(Array(rowCountToRender)).map((_, rowIndex) => {
          const rowCoordinate = rowIndex + minimumPopulatedHexRow
          const rowIsOffset = rowCoordinate % 2 !== 0
          let columnCount = columnCountToRender

          return (
            <div key={rowCoordinate} className={rowIsOffset ? 'row--offset' : undefined}>
              {Array.from(Array(columnCount)).map((_, columnIndex) => {
                const columnCoordinate = columnIndex + minimumPopulatedHexColumn
                const hasAdjacency = hasAdjacencyToExistingHexes(columnCoordinate, rowCoordinate, populatedHexes)

                const terrain = populatedHexes[columnCoordinate] && populatedHexes[columnCoordinate][rowCoordinate] ?
                  populatedHexes[columnCoordinate][rowCoordinate] :
                  hasAdjacency ?
                    ADJACENT_TERRAIN_TYPE :
                    HIDDEN_TERRAIN_TYPE

                return (
                  <Tile
                    key={`${columnCoordinate}, ${rowCoordinate}`}
                    onClick={() => this.addOrDeleteTerrain(columnCoordinate, rowCoordinate)}
                    terrain={terrain}
                    x={columnCoordinate}
                    y={rowCoordinate}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}