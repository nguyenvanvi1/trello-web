
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight:'58px',
    boardBarHeight:'60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary:deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary:orange
      }
    }
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
            backgroundColor:'red',
            borderRadius:'8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor:'blue',
            borderRadius:'8px'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root:({theme})=>({
          color:theme.palette.primary.main,
          fontSize:'0.875rem'
        })
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform : 'none'
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root:({theme})=>{
          return {
            color:theme.palette.primary.main,
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
              borderWidth: '1px !important'
            }
          }
        }
      },
    },
  },
  
  // ..other properties
})

export default theme