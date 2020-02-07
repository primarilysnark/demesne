import Tile from '../components/Tile'
import styles from './ClipPath.module.scss'

function ClipPath() {
  return (
    <div>
      <h1>Clip Path Test</h1>
      <div className={styles.grid}>
        <Tile terrain="mountain" x={0} y={0} />
        <Tile terrain="mountain" x={1} y={0} />
        <Tile terrain="mountain" x={2} y={0} />
        <Tile terrain="mountain" x={3} y={0} />
        <Tile terrain="mountain" x={4} y={0} />
        <Tile terrain="mountain" x={0} y={1} />
        <Tile terrain="mountain" x={1} y={1} />
        <Tile terrain="mountain" x={2} y={1} />
        <Tile terrain="mountain" x={3} y={1} />
        <Tile terrain="mountain" x={0} y={2} />
        <Tile terrain="mountain" x={1} y={2} />
        <Tile terrain="mountain" x={2} y={2} />
        <Tile terrain="mountain" x={3} y={2} />
        <Tile terrain="mountain" x={4} y={2} />
      </div>
    </div>
  )
}

export default ClipPath
