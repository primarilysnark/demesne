import { Component } from 'react'
import { sortBy } from 'lodash'
import RoomModal from './RoomModal'

export enum EarningAllocation {
  Goods = 'goods',
  Influence = 'influence',
  Labor = 'labor',
  Magic = 'magic',
  Gold = 'gp'
}

interface BuildingEditorProps {
  building: {
    [key: string]: any
  }
  deleteEntryById: (entryId: number) => void
  entries: {
    entry: any
    room: any
  }[]
  rooms: {
    [key: string]: any
  }
  updateEarningAllocationForRoomById: (
    entryId: number,
    allocation: EarningAllocation
  ) => void
}

interface BuildingEditorState {
  addRoomModal: {
    isActive: boolean
  }
}

const goodTypes = [
  {
    key: EarningAllocation.Goods,
    kind: 'info',
    icon: 'fa-boxes'
  },
  {
    key: EarningAllocation.Influence,
    kind: 'primary',
    icon: 'fa-crown'
  },
  {
    key: EarningAllocation.Labor,
    kind: 'danger',
    icon: 'fa-user-hard-hat'
  },
  {
    key: EarningAllocation.Magic,
    kind: 'success',
    icon: 'fa-wand-magic'
  },
  {
    key: EarningAllocation.Gold,
    kind: 'warning',
    icon: 'fa-treasure-chest'
  }
]

function getTotalBonusForAttribute(
  attribute: string,
  entryBuildingPairs: any[]
) {
  const sum = entryBuildingPairs
    .filter(
      ({ entry }: { entry: any }) => entry.attributes.earningAllocation === attribute
    )
    .map(({ room }: { room: any }) => room.attributes.bonus)
    .reduce((total: number, bonus: number) => total + bonus, 0)

  if (sum === 0) {
    return ''
  }

  return ` (+${sum})`
}

class BuildingEditor extends Component<
  BuildingEditorProps,
  BuildingEditorState
> {
  constructor(props: BuildingEditorProps) {
    super(props)

    this.state = {
      addRoomModal: {
        isActive: false
      }
    }

    this.closeAddRoomModal = this.closeAddRoomModal.bind(this)
    this.openAddRoomModal = this.openAddRoomModal.bind(this)
  }

  closeAddRoomModal() {
    this.setState({
      addRoomModal: {
        isActive: false
      }
    })
  }

  openAddRoomModal() {
    this.setState({
      addRoomModal: {
        isActive: true
      }
    })
  }

  render() {
    const {
      building,
      deleteEntryById,
      entries,
      updateEarningAllocationForRoomById
    } = this.props
    const { addRoomModal } = this.state

    const sortedEntries = sortBy(entries, 'room.attributes.name', 'entry.id')

    return (
      <section className="section">
        {addRoomModal.isActive ? (
          <RoomModal cancel={this.closeAddRoomModal} />
        ) : null}
        <div className="container">
          <button
            className="button is-primary is-pulled-right"
            onClick={this.openAddRoomModal}
          >
            <span className="icon">
              <i className="fa fa-plus" />
            </span>
            <span>Add new room</span>
          </button>

          <h1 className="title">{building.attributes.name}</h1>
          <h2 className="subtitle">
            Manage capital allocation and daily income
          </h2>

          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Bonus</th>
                <th>
                  Goods {getTotalBonusForAttribute('goods', sortedEntries)}
                </th>
                <th>
                  Influence {getTotalBonusForAttribute('influence', sortedEntries)}
                </th>
                <th>
                  Labor {getTotalBonusForAttribute('labor', sortedEntries)}
                </th>
                <th>
                  Magic {getTotalBonusForAttribute('magic', sortedEntries)}
                </th>
                <th>Gold {getTotalBonusForAttribute('gp', sortedEntries)}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map(
                ({ entry, room }: { entry: any; room: any }) => (
                  <tr key={entry.id}>
                    <td>{room.attributes.name}</td>
                    <td>+{room.attributes.bonus}</td>
                    {goodTypes.map(({ key, kind, icon }) => {
                      if (!room.attributes.earnings[key]) {
                        return <td key={key} />
                      }

                      return (
                        <td key={key}>
                          <button
                            className={`button is-${kind}`}
                            disabled={
                              entry.attributes.earningAllocation === key
                            }
                            onClick={() =>
                              updateEarningAllocationForRoomById(entry.id, key)
                            }
                          >
                            <span className="icon">
                              <i className={`fa fa-fw ${icon}`}></i>
                            </span>
                            <span>Earn {key}</span>
                          </button>
                        </td>
                      )
                    })}
                    <td>
                      <button
                        className="button is-danger is-outlined"
                        onClick={() => deleteEntryById(entry.id)}
                      >
                        <span className="icon">
                          <i className="fa fa-times" />
                        </span>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default BuildingEditor
