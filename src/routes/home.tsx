import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  styled,
  useTheme
} from "@mui/material"
import { useEffect, useState } from "react"

import { useSearchParams } from "react-router-dom"
import EstablishmentsTable from "src/components/routes/home/establishments-table"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import EstablishmentForm from "src/components/common/establishment-form"
import useEducationalEstablishments from "src/hooks/custom/useEducationalEstablishments"
import EstablishmentsMap from "src/components/routes/home/establishments-map"

const drawerWidth = 500

const Home = () => {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialPage = parseInt(searchParams.get("page") || "1", 10)
  const initialSize = parseInt(searchParams.get("size") || "40", 10)

  const initialSelectedEstablishmentId = searchParams.get(
    "selectedEstablishmentId"
  )

  const [paginationOptions, setPaginationOptions] = useState({
    page: initialPage,
    size: initialSize
  })
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState(
    initialSelectedEstablishmentId
  )

  const { paginatedResponse, error, isLoading } = useEducationalEstablishments({
    paginationOptions
  })

  useEffect(() => {
    setSearchParams({
      page: paginationOptions.page.toString(),
      size: paginationOptions.size.toString(),
      selectedEstablishmentId: selectedEstablishmentId || ""
    })
  }, [selectedEstablishmentId, paginationOptions, setSearchParams])

  const handleDrawerClose = () => {
    setSelectedEstablishmentId(null)
  }

  const selectedEstablishment = selectedEstablishmentId
    ? paginatedResponse?.data.find(
        (establishment) => establishment._id === selectedEstablishmentId
      )
    : null

  return (
    <Box component="main">
      <Container maxWidth={false}>
        <Box display="flex">
          <MainContentWrapper open={!!selectedEstablishmentId}>
            <EstablishmentsTable
              paginatedData={paginatedResponse}
              isLoading={isLoading}
              error={error}
              paginationOptions={paginationOptions}
              setPaginationOptions={setPaginationOptions}
              onRowSelect={(selectedId: string) => {
                if (selectedEstablishmentId === selectedId) {
                  setSelectedEstablishmentId(null)
                  return
                }
                setSelectedEstablishmentId(selectedId)
              }}
            />
            <Box sx={{ mt: 4 }}>
              <EstablishmentsMap data={paginatedResponse.data} />
            </Box>
          </MainContentWrapper>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth
              }
            }}
            variant="persistent"
            anchor="right"
            open={!!selectedEstablishmentId}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>

            <Divider />

            <Box sx={{ p: 2 }}>
              <EstablishmentForm initialData={selectedEstablishment} />
            </Box>
          </Drawer>
        </Box>
      </Container>
    </Box>
  )
}

export default Home

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}))

const MainContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "open"
})<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  py: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }),
  position: "relative",
  maxWidth: "100%",
  overflow: "hidden"
}))
