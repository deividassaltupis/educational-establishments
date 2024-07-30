import React, { Dispatch, FC, SetStateAction } from "react"
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material"
import { PaginatedResponse } from "src/hooks/usePaginatedFetch"
import { EducationalEstablishment } from "src/types/entities/educational-establishment"
import styled, { keyframes } from "styled-components"
import { useLocalStorage } from "src/hooks/useLocalStorage"

type Column = {
  id: keyof EducationalEstablishment
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: "ins_id", label: "Internal ID", minWidth: 170 },
  { id: "ins_kodas", label: "Internal code", minWidth: 100 },
  {
    id: "ins_pavad_lt",
    label: "Title",
    minWidth: 170
  },
  {
    id: "ins_motin_id",
    label: "Parent ID",
    minWidth: 170
  },
  {
    id: "ins_ireg_smir_data",
    label: "Education and Science institution registration date",
    minWidth: 170
  },
  {
    id: "ins_isreg_smir_data",
    label: "Education and Science institution deregistration date",
    minWidth: 170
  },
  {
    id: "ins_pask_grupe",
    label: "Group",
    minWidth: 170
  },
  {
    id: "ins_pagr_tipas",
    label: "Main group",
    minWidth: 170
  },
  {
    id: "savivaldybe",
    label: "Municipality",
    minWidth: 170
  },
  {
    id: "sav_pav",
    label: "Municipality name",
    minWidth: 170
  },
  {
    id: "sen_kodas",
    label: "The code of the municipality",
    minWidth: 170
  },
  {
    id: "sen_pav",
    label: "The name of the municipality",
    minWidth: 170
  },
  {
    id: "gyv_kodas",
    label: "Settlement code",
    minWidth: 170
  },
  {
    id: "gyvenamoji_vietove",
    label: "Settlement",
    minWidth: 170
  },
  {
    id: "koord",
    label: "Coordinates",
    minWidth: 170
  }
]

type EstablishmentsTableProps = {
  paginatedData: PaginatedResponse<EducationalEstablishment> | null
  isLoading?: boolean
  error?: Error | null
  paginationOptions: {
    page: number
    size: number
  }
  setPaginationOptions: Dispatch<
    SetStateAction<{
      page: number
      size: number
    }>
  >
  onRowSelect: (selectedId: string) => void
}

const EstablishmentsTable: FC<EstablishmentsTableProps> = ({
  paginatedData,
  isLoading,
  error,
  paginationOptions,
  setPaginationOptions,
  onRowSelect
}) => {
  const { storedValue: storedEstablishments, setValue } = useLocalStorage<
    EducationalEstablishment[]
  >("establishments", [])

  const zeroBasedPaginationOptions = {
    page: paginationOptions.page - 1,
    size: paginationOptions.size
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPaginationOptions({
      ...zeroBasedPaginationOptions,
      page: newPage + 1
    })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaginationOptions({
      ...zeroBasedPaginationOptions,
      size: parseInt(event.target.value, 10),
      page: 1
    })
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{ minHeight: "60vh", maxHeight: "80vh", position: "relative" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <StyledTableBody isLoading={!!isLoading}>
            {isLoading ? (
              <Loader>
                <CircularProgress color="secondary" />
              </Loader>
            ) : (
              paginatedData?.data &&
              paginatedData?.data.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    onClick={() => row._id && onRowSelect(row._id)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            fontSize: "12px",
                            cursor: "pointer"
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </StyledTableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 40, 100]}
        component="div"
        count={paginatedData?.total || 0}
        rowsPerPage={zeroBasedPaginationOptions?.size || 40}
        page={zeroBasedPaginationOptions?.page || 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default EstablishmentsTable

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const StyledTableBody = styled(TableBody)<{ isLoading: boolean }>`
  animation: ${({ isLoading }) => (isLoading ? fadeOut : fadeIn)} 2s ease;
`

const Loader = styled(Box)`
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  animation: ${fadeOut} 2s ease-out forwards;
`
