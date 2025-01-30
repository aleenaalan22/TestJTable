import React, { useState, useEffect } from "react";
import { CCard, CCardHeader, CCol, CFormInput, CFormCheck, CTooltip } from '@coreui/react'
import './custom.css'
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table'
import useFetch from "./useFetch";
const SampleTable = () => {

    const [sorting, setSorting] = useState();
    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 1
    })
    const [url, seturl] = useState('https://jsonmock.hackerrank.com/api/movies/search/?page=' + pagination.pageIndex);
    const { data, totalPages } = useFetch(url)
    const [rowSelection, setRowSelection] = useState({});
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        seturl('https://jsonmock.hackerrank.com/api/movies/search/?page=' + pagination.pageIndex)
    }, [pagination.pageIndex]);

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('Title', {
            cell: info => info.getValue(),
            size: () => 50
        }),
        columnHelper.accessor('Year', {
            cell: info => info.getValue(),
        }),

        columnHelper.accessor('imdbID', {
            header: () => 'IMDB',
            cell: info => info.renderValue(),
        })
    ]

    const addToFavorites = (rowId) => {
        const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
        setFavorites((prev) => [...prev, ...selectedRows]);
        setRowSelection({});
        console.log(selectedRows)
    };


    const table = useReactTable({
        data,
        columns,
        state: { sorting, pagination, rowSelection },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
    });

    return (
        <CCard className="sample-table p-0">
            <CCardHeader><h5>Movie List</h5></CCardHeader>
            <CCol className="m-3">
                <div className="p-2">
                    {/* Table */}
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="bg-gray-200">
                                    <th className="p-3">Select</th>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="p-2 border cursor-pointer hover:bg-gray-300"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {/* Asc Desc */}
                                            {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                                            {/* Filter */}
                                            {header.column.getCanFilter() && (
                                                <CCol className="mt-1">
                                                    <CFormInput
                                                        size="sm"
                                                        value={header.column.getFilterValue() || ''}
                                                        onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                        placeholder={`Search ${header.column.id}`}
                                                    />
                                                </CCol>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="highlight border">
                                    <td className="pl-3">
                                        <CCol style={{ textAlign: "center" }} className={row.getIsSelected() ? "border" : "highlight"}>
                                            <CFormCheck
                                                type="checkbox"
                                                {...{
                                                    checked: row.getIsSelected(),
                                                    onChange: row.getToggleSelectedHandler(),
                                                }}
                                            />

                                        </CCol>
                                    </td>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="p-2 border">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 1 }))} disabled={pagination.pageIndex === 0} className="p-1 m-1 rounded">
                            First
                        </button>
                        <button onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))} disabled={pagination.pageIndex === 0} className="p-1 rounded">
                            Prev
                        </button>
                        <span className="p-2">
                            Page <strong>{table.getState().pagination.pageIndex}</strong> of {totalPages}
                        </span>
                        <button onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))} disabled={pagination.pageIndex >= totalPages - 1} className="m-1 p-1 rounded">
                            Next
                        </button>
                        <button onClick={() => setPagination((prev) => ({ ...prev, pageIndex: totalPages }))} disabled={pagination.pageIndex >= totalPages - 1} className="p-1 rounded">
                            Last
                        </button>
                        <CTooltip content="Result in Console">
                            <button onClick={addToFavorites} className="m-5 p-1 rounded" disabled={!table.getSelectedRowModel().rows.length}>
                                Add to Favorites
                            </button>
                        </CTooltip>
                    </div>
                </div>
            </CCol>
        </CCard >
    )
}

export default SampleTable;