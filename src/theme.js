
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight:'58px',
    boardBarHeight:'60px'
  },
  components: {
    MuiCssBaseline:{
      styleOverrides:{
        body:{
          '*::-webkit-scrollbar': {
            width:'8px',
            height:'8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor:'#dcdde1',
            borderRadius:'8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor:'white',
            borderRadius:'8px'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root:{
          textTransform:'none',
          borderWidth:'0.5px'
        }
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize:'0.875rem'
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root:({theme})=>{
          return {
            fontSize:'0.875rem',
            '.MuiOutlinedInput-notchedOutline':{
              borderColor:theme.palette.primary.light
            },
            '&:hover':{
              '.MuiOutlinedInput-notchedOutline':{
                borderColor:theme.palette.primary.main
              }
            },
            '& fieldset': {
              borderWidth: '0.5px !important'
            }
          }
        }
      },
    },
  },
  
  // ..other properties
})

export default theme