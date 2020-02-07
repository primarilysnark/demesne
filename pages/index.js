import MountainTile from '../components/tiles/MountainTile'
import styles from './Index.module.css'

function HomePage() {
  return (
    <div>
      <h1>Clip Path Test</h1>
      <div className={styles.grid}>
        <MountainTile x={0} y={0} />
        <MountainTile x={0} y={1} />
        <MountainTile x={0} y={2} />
        <MountainTile x={0} y={3} />
        <MountainTile x={0} y={4} />
        <MountainTile x={1} y={0} />
        <MountainTile x={1} y={1} />
        <MountainTile x={1} y={2} />
        <MountainTile x={1} y={3} />
        <MountainTile x={2} y={0} />
        <MountainTile x={2} y={1} />
        <MountainTile x={2} y={2} />
        <MountainTile x={2} y={3} />
        <MountainTile x={2} y={4} />
      </div>
    </div>
  )
}

export default HomePage
