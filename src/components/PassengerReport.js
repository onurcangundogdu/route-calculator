import React, { useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table'

const PassengerReport = ({ passengers }) => {

  const data = passengers.map(pas => ({
    name: pas.name,
    tripDuration: pas.tripDuration < 0 ? 0 : pas.tripDuration,
    pickUpPointOrder: pas.pickUpPointOrder < 0 ? 0 : pas.pickUpPointOrder
  }))

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      sortType: "basic",
      filter: "text"
    },
    {
      Header: "Trip Duration",
      accessor: "tripDuration",
      sortType: "basic",
      filter: "text"
    },
    {
      Header: "Pickup Order",
      accessor: "pickUpPointOrder",
      sortType: "basic",
      filter: "text"
    }
  ]

  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
  }) => {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search ${count} records...`}
        type="text"
      />
    )
  }

  const Table = ({ columns, data }) => {
    const filterTypes = useMemo(
      () => ({
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true
          })
        }
      }),
      []
    )

    const defaultColumn = useMemo(
      () => ({
        Filter: DefaultColumnFilter
      }),
      []
    )

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        filterTypes
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
    )
  
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  

  return <Table columns={columns} data={data} />
}

export default PassengerReport
