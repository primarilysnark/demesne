import Tile from '../components/Tile'
import './ClipPath.module.scss'

function ClipPath() {
  return (
    <div className="grid">
      <div style={{width: '467px'}}>
        <div className="row">
          <Tile terrain="mountain" x={0} y={0} />
          <Tile terrain="mountain" x={1} y={0} />
          <Tile terrain="mountain" x={2} y={0} />
          <Tile terrain="mountain" x={3} y={0} />
          <Tile terrain="mountain" x={4} y={0} />
        </div>
        <div className="row">
          <Tile terrain="mountain" x={0} y={1} />
          <Tile terrain="mountain" x={1} y={1} />
          <Tile terrain="mountain" x={2} y={1} />
          <Tile terrain="mountain" x={3} y={1} />
        </div>
        <div className="row">
          <Tile terrain="mountain" x={0} y={2} />
          <Tile terrain="mountain" x={1} y={2} />
          <Tile terrain="mountain" x={2} y={2} />
          <Tile terrain="mountain" x={3} y={2} />
          <Tile terrain="mountain" x={4} y={2} />
        </div>
      </div>
    </div>
  )
}

export default ClipPath
