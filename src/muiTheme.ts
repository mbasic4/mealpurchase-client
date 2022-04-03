import { createTheme } from "@mui/material"

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ffcd17'
    },
    text: {
      primary: '#2f4f4f'
    }
  },
  typography: {
    allVariants: {
      color: '#2f4f4f'
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#ffcd17',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#ffcd17',
          }
        }
      }
    }
  }
})
