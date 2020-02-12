import { Component } from 'react'
import { DemesneWebSocket } from '../utils/websocket'
import Grid from '../components/Grid'
import Map from '../utils/map'
import TerrainModal from '../components/TerrainModal'
import './Index.module.scss'

interface TileMapState {
  map: Map
  socketState: number | null
  terrainModal: {
    column: number | null
    isActive: boolean
    row: number | null
  }
}

class TileMap extends Component<{}, TileMapState> {
  public socket: DemesneWebSocket | null

  constructor(props: {}) {
    super(props)

    this.state = {
      socketState: null,
      map: new Map({ populatedHexes: {} }),
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    }

    this.socket = null

    this.onAddTile = this.onAddTile.bind(this)
    this.onCancelAddTile = this.onCancelAddTile.bind(this)
    this.onClickTile = this.onClickTile.bind(this)
  }

  componentDidMount() {
    this.socket = DemesneWebSocket.connect('ws://localhost:8080/api/map')

    this.socket.on('message', ({ type, content }) => {
      switch (type) {
        case 'sync':
          this.setState({
            map: Map.fromArray(
              content.data.map((entry: any) => entry.attributes)
            ),
            socketState: WebSocket.OPEN
          })
          break

        case 'hex-added':
        case 'hex-updated':
          this.setState(state => ({
            map: state.map.addHex({
              column: content.column,
              row: content.row,
              terrain: content.terrain
            })
          }))
          break

        case 'hex-removed':
          this.setState(state => ({
            map: state.map.removeHex({
              column: content.column,
              row: content.row
            })
          }))
          break
      }
    })

    this.socket.on('open', () => {
      this.socket?.send('sync', {
        mapId: 1
      })
    })
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close()
    }
  }

  onCancelAddTile() {
    this.setState({
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    })
  }

  onClickTile({ column, row }: { column: number; row: number }) {
    return this.setState(state => {
      const { map } = state

      if (!map.hasPopulatedHex({ column, row })) {
        return {
          map: state.map,
          terrainModal: {
            isActive: true,
            column,
            row
          }
        }
      }

      this.socket?.send('remove-hex', {
        column,
        mapId: 1,
        row
      })

      return {
        map: map.removeHex({ column, row }),
        terrainModal: state.terrainModal
      }
    })
  }

  onAddTile({ terrain }: { terrain: string }) {
    const { column, row } = this.state.terrainModal

    this.socket?.send('add-hex', {
      column,
      mapId: 1,
      row,
      terrain
    })

    this.setState(state => ({
      map: state.map.addHex({
        column: state.terrainModal.column as number,
        row: state.terrainModal.row as number,
        terrain
      }),
      terrainModal: {
        isActive: false,
        column: null,
        row: null
      }
    }))
  }

  render() {
    const { map, socketState, terrainModal } = this.state

    return (
      <div className="grid">
        {socketState && socketState === WebSocket.OPEN ? (
          <Grid map={map} onClickTile={this.onClickTile} />
        ) : null}
        {terrainModal.isActive ? (
          <TerrainModal
            onCancel={this.onCancelAddTile}
            onSubmit={this.onAddTile}
          />
        ) : null}
      </div>
    )
  }
}

export default TileMap
