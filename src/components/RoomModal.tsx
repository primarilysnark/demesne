import { Component } from 'react'
import Modal from './Modal'

interface RoomModalProps {
  cancel: () => void
}

class RoomModal extends Component<RoomModalProps, {}> {
  render() {
    const { cancel } = this.props

    return (
      <Modal>
        <Modal.Header>
          <div className="icon icon--circle">
            <i className="fas fa-drafting-compass" />
          </div>
          <Modal.Title>Add new room</Modal.Title>
        </Modal.Header>
        <Modal.Content>Hello</Modal.Content>
        <Modal.Footer>
          <p className="control">
            <button className="button is-primary is-outlined" onClick={cancel}>
              Cancel
            </button>
          </p>
          <p className="control">
            <button className="button is-primary">Next</button>
          </p>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RoomModal
