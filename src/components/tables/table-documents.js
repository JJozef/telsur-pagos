/* eslint-disable indent */
/* eslint-disable multiline-ternary */
'use client'

import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/format-currency'
import { formatDate } from '@/lib/format-date'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useStore } from '@/store/main'
import { nanoid } from 'nanoid'
import { ArrowDown01, ArrowUp01 } from 'lucide-react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'doc_type',
    header: () => {
      return <div className='text-nowrap'>Tipo Documento</div>
    },
    cell: ({ row }) => {
      return <div className='capitalize'>{row.getValue('doc_type')}</div>
    }
  },
  {
    accessorKey: 'doc_num',
    header: () => {
      return <div className='text-nowrap'>N° Documento</div>
    },
    cell: ({ row }) => (
      <div className='text-nowrap'>{row.getValue('doc_num')}</div>
    )
  },
  {
    accessorKey: 'doc_date',
    header: () => {
      return <div className='text-nowrap'>Fecha Documento</div>
    },
    cell: ({ row }) => (
      <div className='text-nowrap'>{formatDate(row.getValue('doc_date'))}</div>
    )
  },
  {
    accessorKey: 'due_date',
    header: () => {
      return <div className='text-nowrap'>Fecha Vencimiento</div>
    },
    cell: ({ row }) => (
      <div className='text-nowrap'>{formatDate(row.getValue('due_date'))}</div>
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className='flex items-center justify-end'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Monto
            {column.getIsSorted() === 'asc' ? (
              <ArrowDown01 className='ml-2 h-4 w-4' />
            ) : (
              <ArrowUp01 className='ml-2 h-4 w-4' />
            )}
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      return (
        <div className='text-right font-medium'>{formatCurrency(amount)}</div>
      )
    }
  }
]

export function DataTableDocuments({ data }) {
  const tableId = useState(() => nanoid())[0]
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const { updateDocumentsToPay } = useStore()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const tableSelection = table.getFilteredSelectedRowModel().rows

  useEffect(() => {
    const selectedDocuments = tableSelection.map((row) => row.original)
    updateDocumentsToPay(selectedDocuments, tableId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableSelection])

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No hay documentos para mostrar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} filas seleccionadas
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
