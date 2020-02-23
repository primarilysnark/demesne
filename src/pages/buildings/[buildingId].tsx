import { NextPageContext } from 'next'
import { merge } from 'lodash'

import { client } from '../../utils/axios'
import BuildingEditorContainer from '../../containers/BuildingEditorContainer'

function BuildingEditorPage({ data }: { data: any }) {
  return <BuildingEditorContainer data={data} />
}

BuildingEditorPage.getInitialProps = async ({ query }: NextPageContext) => {
  const [buildingData, roomData] = await Promise.all([
    client.get(`/buildings/${query.buildingId}`),
    client.get('/rooms?page[size]=100')
  ])

  return {
    data: merge(buildingData.data, roomData.data)
  }
}

export default BuildingEditorPage
