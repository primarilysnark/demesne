import { Component } from 'react'
import { withRouter } from 'next/router'
import { filter, omit } from 'lodash'

import { client } from '../utils/axios'
import { WithRouterProps } from 'next/dist/client/with-router'
import BuildingEditor, { EarningAllocation } from '../components/BuildingEditor'

interface BuildingEditorContainerProps extends WithRouterProps {
  data: any
}

interface BuildingEditorContainerState {
  buildings: any
  buildingEntries: any
  rooms: any
}

class BuildingEditorContainer extends Component<
  BuildingEditorContainerProps,
  BuildingEditorContainerState
> {
  static getDerivedStateFromProps(
    props: BuildingEditorContainerProps,
    state: BuildingEditorContainerState
  ) {
    return {
      buildings: state.buildings || props.data.buildings,
      buildingEntries: state.buildingEntries || props.data.buildingEntries,
      rooms: state.rooms || props.data.rooms
    }
  }

  constructor(props: BuildingEditorContainerProps) {
    super(props)

    this.state = {
      buildings: null,
      buildingEntries: null,
      rooms: null
    }

    this.deleteEntryById = this.deleteEntryById.bind(this)
    this.updateEarningAllocationForRoomById = this.updateEarningAllocationForRoomById.bind(
      this
    )
  }

  async deleteEntryById(entryId: number) {
    const { router } = this.props
    const buildingId = router.query.buildingId as string

    await client.delete(`/buildings/${buildingId}/entries/${entryId}`)

    this.setState(state => ({
      buildings: {
        ...state.buildings,
        [buildingId]: {
          ...state.buildings[buildingId],
          relationships: {
            ...state.buildings[buildingId].relationships,
            buildingEntries: {
              ...state.buildings[buildingId].relationships.buildingEntries,
              data: filter(
                state.buildings[buildingId].relationships.buildingEntries.data,
                entry => entry.id !== entryId
              )
            }
          }
        }
      },
      buildingEntries: omit(state.buildingEntries, entryId)
    }))
  }

  async updateEarningAllocationForRoomById(
    entryId: number,
    earningAllocation: EarningAllocation | undefined
  ) {
    const { router } = this.props

    const { data } = await client.post(
      `/buildings/${router.query.buildingId}/entries/${entryId}`,
      {
        data: {
          attributes: {
            earningAllocation
          }
        }
      }
    )

    this.setState(state => ({
      buildingEntries: {
        ...state.buildingEntries,
        [entryId]: data.buildingEntries[entryId]
      }
    }))
  }

  render() {
    const { router } = this.props
    const { buildings, buildingEntries, rooms } = this.state

    const buildingId = router.query.buildingId as string
    const building = buildings[buildingId]

    const entries = building.relationships.buildingEntries.data.map(
      ({ id }: { id: number }) => {
        return {
          entry: buildingEntries[id],
          room: rooms[buildingEntries[id].relationships.room.data.id]
        }
      }
    )

    return (
      <BuildingEditor
        building={building}
        deleteEntryById={this.deleteEntryById}
        entries={entries}
        rooms={rooms}
        updateEarningAllocationForRoomById={
          this.updateEarningAllocationForRoomById
        }
      />
    )
  }
}

export default withRouter(BuildingEditorContainer)
