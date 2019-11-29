import React from 'react'

import UserTable from './UserTable'

import useUser from '../../hooks/useUser'
import useReload from '../../hooks/useReload'

import './ManageUsers.scss'

const tableStyle = {
  position: 'absolute',
  left: '5vw',
  top: '9vw',
  width: '90vw',
  height: '75vh',
}

function ManageUsers() {
  const [shouldReload, reloadData] = useReload()
  const user = useUser('ALL', { reload: shouldReload })

  return (
    <UserTable
      style={tableStyle}
      data={user ? user.map(({ password, ...rest }) => rest) : []}
      reloadData={reloadData}
    />
  )
}

export default ManageUsers
