import { omit } from 'lodash'

interface HexMap {
  [key: number]: {
    [key: number]: {
      terrain: string
    }
  }
}

interface SimpleHex {
  column: number
  row: number
  terrain: string
}

class Map {
  populatedHexes: HexMap

  constructor({ populatedHexes }: { populatedHexes: HexMap }) {
    this.populatedHexes = populatedHexes
    this.getColumns = this.getColumns.bind(this)
    this.hasPopulatedHex = this.hasPopulatedHex.bind(this)
  }

  static fromArray(hexes: SimpleHex[]) {
    const populatedHexes = hexes.reduce(
      (hexes: HexMap, { column, row, ...hex }) => {
        if (!hexes[column]) {
          return {
            ...hexes,
            [column]: {
              [row]: hex
            }
          }
        }

        return {
          ...hexes,
          [column]: {
            ...hexes[column],
            [row]: hex
          }
        }
      },
      {}
    )

    return new Map({ populatedHexes })
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

  addHex({ column, row, ...hex }: SimpleHex) {
    const populatedHexes = {
      ...this.populatedHexes,
      [column]: {
        ...(this.populatedHexes[column] || {}),
        [row]: hex
      }
    }

    return new Map({ populatedHexes })
  }

  removeHex({ column, row }: { column: number; row: number }) {
    if (!this.populatedHexes[column][row]) {
      return new Map({ populatedHexes: this.populatedHexes })
    }

    if (Object.keys(this.populatedHexes[column]).length === 1) {
      return new Map({ populatedHexes: omit(this.populatedHexes, [column]) })
    }

    return new Map({
      populatedHexes: {
        ...this.populatedHexes,
        [column]: omit(this.populatedHexes[column], [row])
      }
    })
  }
}

export default Map
