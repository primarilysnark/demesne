import { Component } from 'react'
import Modal from './Modal'
import './TerrainModal.module.scss'

interface TerrainModalProps {
  onCancel: () => void
  onSubmit: ({ terrain }: { terrain: string }) => void
}

interface TerrainModalState {
  terrain: string | null
}

const TERRAINS = [
  'desert',
  'forest',
  'hills',
  'jungle',
  'marsh',
  'mountain',
  'plains',
  'water'
]

class TerrainModal extends Component<TerrainModalProps, TerrainModalState> {
  constructor(props: TerrainModalProps) {
    super(props)

    this.state = {
      terrain: null
    }

    this.selectTerrain = this.selectTerrain.bind(this)
    this.submit = this.submit.bind(this)
  }

  selectTerrain(terrain: string) {
    this.setState({
      terrain
    })
  }

  submit(event: any) {
    event.preventDefault()

    if (!this.state.terrain) {
      return
    }

    this.props.onSubmit({ terrain: this.state.terrain })
  }

  render() {
    const { onCancel } = this.props
    const { terrain } = this.state

    return (
      <Modal>
        <Modal.Header>
          <div className="icon icon--circle">
            <i className="fas fa-island-tropical" />
          </div>
          <Modal.Title>Choose terrain</Modal.Title>
        </Modal.Header>
        <Modal.Content>
          <ul className="terrain-list">
            {TERRAINS.map(terrainOption => (
              <li key={terrainOption}>
                <button
                  className={`terrain-list__option ${
                    terrain === terrainOption
                      ? 'terrain-list__option--active'
                      : ''
                  }`}
                  onClick={() => this.selectTerrain(terrainOption)}
                >
                  <img src={`./${terrainOption}-1.png`} />
                  <div className="terrain-list__name">{terrainOption}</div>
                </button>
              </li>
            ))}
          </ul>
        </Modal.Content>
        <Modal.Footer>
          <p className="control">
            <button
              className="button is-primary is-outlined"
              onClick={onCancel}
            >
              Cancel
            </button>
          </p>
          <p className="control">
            <button className="button is-primary" onClick={this.submit}>
              Next
            </button>
          </p>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default TerrainModal
