import Tile from '../components/Tile'
import styles from './ClipPath.module.scss'

function MixedTiles() {
  return (
    <div>
      <h1>Mixed Tile Test</h1>
      <div className={styles.grid}>
        <Tile terrain="ocean" x={1} y={0} />
        <Tile terrain="marsh" x={2} y={0} />
        <Tile terrain="marsh" x={3} y={0} />
        <Tile terrain="ocean" x={0} y={1} />
        <Tile terrain="marsh" x={1} y={1} />
        <Tile terrain="mountain" x={2} y={1} />
      </div>
    </div>
  )
}

export default MixedTiles
