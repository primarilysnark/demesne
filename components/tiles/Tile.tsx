import { Fragment } from 'react'
import './Index.module.scss'

const HIDDEN_TERRAIN = ['new', 'hidden']

function Tile({ x, y, onClick, terrain, variantCount }: { x: number, y: number, onClick?: () => void, terrain: string, variantCount: number }) {
  const variant = Math.abs(x + y) % variantCount + 1

  return (
    <button className={`hex-tile hex-tile--${terrain} hex-tile--${terrain}-${variant}`} onClick={onClick}>
      {HIDDEN_TERRAIN.includes(terrain) ? null : (
        <Fragment>
          <img src={`/${terrain}-${variant}.png`} />
          <div className="hex-tile__under" />
        </Fragment>
      )}
    </button>
  )
}

Tile.defaultProps = {
  variantCount: 4
}

export default Tile
