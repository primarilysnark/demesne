import Tile from '../components/tiles/Tile'
import './ClipPath.module.scss'

function MixedTiles() {
  return (
    <div className="grid">
      <div style={{width: '467px'}}>
        <div className="row" style={{ marginLeft: '85px' }}>
          <Tile terrain="ocean" x={1} y={0} />
          <Tile terrain="marsh" x={2} y={0} />
          <Tile terrain="marsh" x={3} y={0} />
        </div>
        <div className="row">
          <Tile terrain="ocean" x={0} y={1} />
          <Tile terrain="marsh" x={1} y={1} />
          <Tile terrain="mountain" x={2} y={1} />
        </div>
      </div>
    </div>
  )
}

export default MixedTiles
