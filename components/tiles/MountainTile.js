import styles from './MountainTile.module.css'

function MountainTile({ x, y }) {
  const xCoordinate = 42 + 64 * x;
  const yCoordinate = 64 + 85 * y + (x % 2 === 1 ? 42 : 0);

  const variant = Math.abs(x | y) % 4 + 1

  return (
    <div className={styles[`hex-tile--mountain-${variant}`]} style={{ top: `${xCoordinate}px`, left: `${yCoordinate}px` }}>
      <img src={`/mountain-${variant}.png`} />
    </div>
  )
}

export default MountainTile
