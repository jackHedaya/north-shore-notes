import React, { forwardRef } from 'react'
import MaterialTable from 'material-table'

import { addUser, updateUser, deleteUser } from '../../services/user.service'

import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'

import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

/**
 *
 * @param {string} text
 * @param {number} limit
 */
const ellipses = (text, limit) => {
  return text ? text.substr(0, limit - 3) + '...' : ''
}

function Table(props) {
  const { reloadData } = props

  const { token } = useAuth()
  const user = useUser('ME')

  return (
    <MaterialTable
      title="Active Users"
      icons={tableIcons}
      options={{ paging: false }}
      localization={{
        body: { editRow: { deleteText: 'Are you sure you would like to delete this user?' } },
      }}
      columns={[
        {
          title: 'ID',
          field: 'id',
          editable: 'never',
          render: ({ id } = {}) => <>{ellipses(id, 11)}</>,
        },
        { title: 'First name', field: 'first_name' },
        { title: 'Last Name', field: 'last_name' },
        { title: 'Username', field: 'username', editable: 'never' },
        {
          title: 'Password',
          field: 'password',
          searchable: false,
          filtering: false,
          initialEditValue: '',
          render: () => <>&lt;Hidden&gt;</>,
        },
        {
          title: 'Role',
          field: 'role',
          lookup: { ADMIN: 'ADMIN', EDITOR: 'EDITOR' },
          editable: (_, row = {}) => row.id !== user.id,
        },
      ]}
      editable={{
        onRowAdd: newData => addUser({ token, ...newData }).then(_ => reloadData()),

        onRowUpdate: (newData, oldData) =>
          updateUser(newData.id, {
            token,
            changes: shallowObjectComparison(oldData, newData),
          }).then(_ => reloadData()),

        onRowDelete: oldData =>
          new Promise(resolve => {
            if (oldData.id === user.id) resolve()
            else
              deleteUser(oldData.id, { token })
                .then(_ => {
                  resolve()
                  reloadData()
                })
                .catch(_ => resolve())
          }),
      }}
      {...props}
    />
  )
}

function shallowObjectComparison(oldObj, newObj) {
  let ret = {}

  Object.entries(newObj).forEach(([key, val]) => {
    if (val !== oldObj[key]) ret[key] = val
  })

  return ret
}

export default Table
