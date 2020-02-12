import { hasAdjacencyToExistingHexes } from '../utils/hexes'
import HexMap, { HexCoordinate } from '../utils/hex-map'
import Tile from './tiles/Tile'
import './HexMapGrid.module.scss'

const ADJACENT_TERRAIN_TYPE = 'new'
const HIDDEN_TERRAIN_TYPE = 'hidden'

function HexMapGrid({
  map,
  onClickTile
}: {
  map: HexMap
  onClickTile: ({ column, row }: HexCoordinate) => void
}) {
  const populatedHexes = map.getColumns()
  const populatedHexColumns = Object.keys(populatedHexes).map(column =>
    parseInt(column, 10)
  )
  const firstPopulatedColumnRows = Object.keys(
    populatedHexes[populatedHexColumns[0]]
  ).map(row => parseInt(row, 10))

  // Set starting minimum and maximum column and row coordinates
  const minimumPopulatedHexColumn = Math.min(...populatedHexColumns) - 1
  const maximumPopulatedHexColumn = Math.max(...populatedHexColumns)
  let minimumPopulatedHexRow = Math.min(...firstPopulatedColumnRows)
  let maximumPopulatedHexRow = Math.max(...firstPopulatedColumnRows)

  // Loop through all columns to determine minimum and maximum row coordinates
  populatedHexColumns.forEach(column => {
    const columnRows = Object.keys(populatedHexes[column]).map(row =>
      parseInt(row, 10)
    )

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
  const columnCountToRender =
    maximumPopulatedHexColumn - minimumPopulatedHexColumn + 2
  const rowCountToRender = maximumPopulatedHexRow - minimumPopulatedHexRow + 1

  const gridWidth = columnCountToRender * 85 + 42.5

  return (
    <div className="wrapper" style={{ width: `${gridWidth}px` }}>
      {Array.from(Array(rowCountToRender)).map((_row, rowIndex) => {
        const rowCoordinate = rowIndex + minimumPopulatedHexRow
        const rowIsOffset = rowCoordinate % 2 !== 0

        return (
          <div
            key={rowCoordinate}
            className={rowIsOffset ? 'row--offset' : undefined}
          >
            {Array.from(Array(columnCountToRender)).map(
              (_column, columnIndex) => {
                const columnCoordinate = columnIndex + minimumPopulatedHexColumn

                const hex = map.getHex({
                  column: columnCoordinate,
                  row: rowCoordinate
                })
                const hasAdjacency = hasAdjacencyToExistingHexes(
                  columnCoordinate,
                  rowCoordinate,
                  populatedHexes
                )

                const terrain = hex
                  ? hex.terrain
                  : hasAdjacency
                  ? ADJACENT_TERRAIN_TYPE
                  : HIDDEN_TERRAIN_TYPE

                return (
                  <Tile
                    key={`${columnCoordinate}, ${rowCoordinate}`}
                    onClick={() =>
                      onClickTile({
                        column: columnCoordinate,
                        row: rowCoordinate
                      })
                    }
                    terrain={terrain}
                    x={columnCoordinate}
                    y={rowCoordinate}
                  />
                )
              }
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HexMapGrid
