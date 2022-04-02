import React from 'react'
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material'

const Navbar = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <Container>
            <Typography variant="h5">
              MealPurchase
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
