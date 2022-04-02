import React from 'react'
import { Chip, Grid, Paper } from '@mui/material'

interface TagSelectProps {
  options: Array<{
    id: number | string
    label: string
  }>
}

export function TagSelect ({ options }: TagSelectProps) {
  return (
    <Paper sx={{ py: 3 }}>
      <Grid container spacing={2} sx={{ px: 2 }}>
        {options.map(option =>
          <Grid item key={option.id}>
            <Chip
              clickable
              label={option.label}
              variant={option.id === 0 ? 'filled' : 'outlined'}
              color={option.id === 0 ? 'primary' : 'default'}
              sx={{ width: 110, height: 40 }}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
