import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export function Loader () {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ m: 'auto' }}>
        <CircularProgress />
      </Box>
    </Box>
  )
}
