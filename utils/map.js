import { omit } from 'lodash'

class Map {
  constructor({ populatedHexes }) {
    if (Array.isArray(populatedHexes)) {
      this.populatedHexes = populatedHexes.reduce((hexes, { column, row, ...hex }) => {
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
      }, {})
    } else {
      this.populatedHexes = populatedHexes
    }

    this.getColumns = this.getColumns.bind(this)
    this.hasPopulatedHex = this.hasPopulatedHex.bind(this)
  }

  getColumns() {
    return this.populatedHexes
  }

  getHex({ column, row }) {
    if (!this.hasPopulatedHex({ column, row })) {
      return undefined
    }

    return this.populatedHexes[column][row]
  }

  hasPopulatedHex({ column, row }) {
    return this.populatedHexes[column] !== undefined &&
      this.populatedHexes[column][row] !== undefined
  }

  addHex({ column, row, ...hex }) {
    const populatedHexes = {
      ...this.populatedHexes,
      [column]: {
        ...(this.populatedHexes[column] || {}),
        [row]: hex
      }
    }

    return new Map({ populatedHexes })
  }

  removeHex({ column, row }) {
    if (!this.populatedHexes[column][row]) {
      throw new Error('Hex is not populated and therefore cannot be removed.')
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
