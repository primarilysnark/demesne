import { Fragment } from 'react'
import styles from './Tile.module.css'

function Tile({ x, y, terrain, variantCount }) {
  const xCoordinate = 64 + 85 * x + (y % 2 === 1 ? 42 : 0);
  const yCoordinate = 42 + 64 * y;

  const variant = Math.abs(x | y) % variantCount + 1
  let className = styles['hex-tile']

  if (styles[`hex-tile--${terrain}`]) {
    className = `${className} ${styles[`hex-tile--${terrain}`]}`
  }

  if (styles[`hex-tile--${terrain}-${variant}`]) {
    className = `${className} ${styles[`hex-tile--${terrain}-${variant}`]}`
  }

  return (
    <Fragment>
      <button className={className} style={{ top: `${yCoordinate}px`, left: `${xCoordinate}px` }}>
        <img src={`/${terrain}-${variant}.png`} />
      </button>
      <div className={styles['hex-tile--under']} style={{ top: `${yCoordinate}px`, left: `${xCoordinate}px` }} />
    </Fragment>
  )
}

Tile.defaultProps = {
  variantCount: 4
}

export default Tile
