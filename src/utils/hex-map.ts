import { omit } from 'lodash'

interface HexMapCoordinates {
  [key: number]: {
    [key: number]: {
      terrain: string
    }
  }
}

export interface HexCoordinate {
  column: number
  row: number
}

export interface Hex extends HexCoordinate {
  terrain: string
}

class HexMap {
  populatedHexes: HexMapCoordinates

  constructor({ populatedHexes }: { populatedHexes: HexMapCoordinates }) {
    this.populatedHexes = populatedHexes
    this.getColumns = this.getColumns.bind(this)
    this.hasPopulatedHex = this.hasPopulatedHex.bind(this)
  }

  static fromArray(hexes: Hex[]) {
    const populatedHexes = hexes.reduce(
      (coordinates: HexMapCoordinates, { column, row, ...hex }) => {
        if (!coordinates[column]) {
          return {
            ...coordinates,
            [column]: {
              [row]: hex
            }
          }
        }

        return {
          ...coordinates,
          [column]: {
            ...coordinates[column],
            [row]: hex
          }
        }
      },
      {}
    )

    return new HexMap({ populatedHexes })
  }

  getColumns() {
    return this.populatedHexes
  }

  getHex({ column, row }: { column: number; row: number }) {
    if (!this.hasPopulatedHex({ column, row })) {
      return undefined
    }

    return this.populatedHexes[column][row]
  }

  hasPopulatedHex({ column, row }: { column: number; row: number }) {
    return (
      this.populatedHexes[column] !== undefined &&
      this.populatedHexes[column][row] !== undefined
    )
  }

  addHex({ column, row, ...hex }: Hex) {
    const populatedHexes = {
      ...this.populatedHexes,
      [column]: {
        ...(this.populatedHexes[column] || {}),
        [row]: hex
      }
    }

    return new HexMap({ populatedHexes })
  }

  removeHex({ column, row }: { column: number; row: number }) {
    if (!this.hasPopulatedHex({ column, row })) {
      return new HexMap({ populatedHexes: this.populatedHexes })
    }

    if (Object.keys(this.populatedHexes[column]).length === 1) {
      return new HexMap({ populatedHexes: omit(this.populatedHexes, [column]) })
    }

    return new HexMap({
      populatedHexes: {
        ...this.populatedHexes,
        [column]: omit(this.populatedHexes[column], [row])
      }
    })
  }
}

export default HexMap
