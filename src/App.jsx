import { Box, Container} from '@mui/material'

function App() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>
        <Box sx={{
          backgroundColor:'primary.light',
          width:'100%',
          height:(theme) => theme.trello.appBarHeight,
          display:'flex',
          alignItems:'center'
        }}>
        </Box>
        <Box sx={{
          backgroundColor:'primary.dark',
          width:'100%',
          height:(theme) => theme.trello.boardHeight,
          display:'flex',
          alignItems:'center'
        }}>
          Board bar
        </Box>
        <Box sx={{
          backgroundColor:'primary.main',
          width:'100%',
          height:(theme)=> `calc(100vh-${theme.trello.appBarHeight} - ${theme.trello.boardHeight})`,
          display:'flex',
          alignItems:'center'
        }}>
          Board content
        </Box>
      </Container>
    </>
  )
}

export default App
