import { Component } from 'react'
import { DemesneWebSocket } from '../utils/websocket'
import HexMapEditor from '../components/HexMapEditor'
import HexMap, { Hex, HexCoordinate } from '../utils/hex-map'

interface HexMapEditorContainerProps {
  url: string
}

interface HexMapEditorContainerState {
  isReady: boolean
  map: HexMap
}

class HexMapEditorContainer extends Component<
  HexMapEditorContainerProps,
  HexMapEditorContainerState
> {
  public socket: DemesneWebSocket | null

  constructor(props: HexMapEditorContainerProps) {
    super(props)

    this.state = {
      isReady: false,
      map: new HexMap({ populatedHexes: {} })
    }

    this.socket = null

    this.addHex = this.addHex.bind(this)
    this.removeHex = this.removeHex.bind(this)
  }

  componentDidMount() {
    const { url } = this.props

    this.socket = DemesneWebSocket.connect(url)

    this.socket.on('message', ({ type, content }) => {
      switch (type) {
        case 'sync':
          this.setState({
            map: HexMap.fromArray(
              content.data.map((entry: any) => entry.attributes)
            ),
            isReady: true
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

  addHex({ column, row, terrain }: Hex) {
    this.setState(
      state => ({
        map: state.map.addHex({
          column,
          row,
          terrain
        })
      }),
      () => {
        this.socket?.send('add-hex', {
          column,
          mapId: 1,
          row,
          terrain
        })
      }
    )
  }

  removeHex({ column, row }: HexCoordinate) {
    this.setState(
      state => ({
        map: state.map.removeHex({
          column,
          row
        })
      }),
      () => {
        this.socket?.send('remove-hex', {
          column,
          mapId: 1,
          row
        })
      }
    )
  }

  render() {
    const { isReady, map } = this.state

    return (
      <HexMapEditor
        addHex={this.addHex}
        isReady={isReady}
        removeHex={this.removeHex}
        map={map}
      />
    )
  }
}

export default HexMapEditorContainer
