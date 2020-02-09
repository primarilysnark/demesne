export function hasAdjacencyToExistingHexes(columnCoordinate, rowCoordinate, existingHexes) {
  const isOffsetRow = rowCoordinate % 2 !== 0

  if (existingHexes[columnCoordinate]) {
    if (existingHexes[columnCoordinate][rowCoordinate - 1] !== undefined) {
      return true
    }
    
    if (existingHexes[columnCoordinate][rowCoordinate + 1] !== undefined) {
      return true
    }
  }

  if (existingHexes[columnCoordinate - 1]) {
    if (existingHexes[columnCoordinate - 1][rowCoordinate] !== undefined) {
      return true
    }

    if (!isOffsetRow && existingHexes[columnCoordinate - 1][rowCoordinate - 1] !== undefined) {
      return true
    }

    if (!isOffsetRow && existingHexes[columnCoordinate - 1][rowCoordinate + 1] !== undefined) {
      return true
    }
  }

  if (existingHexes[columnCoordinate + 1]) {
    if (existingHexes[columnCoordinate + 1][rowCoordinate] !== undefined) {
      return true
    }

    if (isOffsetRow && existingHexes[columnCoordinate + 1][rowCoordinate - 1] !== undefined) {
      return true
    }

    if (isOffsetRow && existingHexes[columnCoordinate + 1][rowCoordinate + 1] !== undefined) {
      return true
    }
  }

  return false
}
