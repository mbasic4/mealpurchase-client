import React from 'react'
import { Box, Typography } from '@mui/material'

export function ErrorFallback() {
  return (
    <Box>
      <Typography component='p'>Something went wrong!</Typography>
    </Box>
  )
}
