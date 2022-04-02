import React, { useState } from 'react'
import { Chip, Grid, Paper } from '@mui/material'

interface TagSelectProps {
  value?: string
  options: Array<{
    id: string
    label: string
  }>
  onSelect?: (id: string) => void
}

export function TagSelect ({ value, options, onSelect }: TagSelectProps) {
  const [ selected, setSelected ] = useState(value)
  return (
    <Paper sx={{ py: 3 }}>
      <Grid container spacing={2} sx={{ px: 2 }}>
        {options.map((option, index) =>
          <Grid item key={option.id}>
            <Chip
              clickable
              tabIndex={index}
              label={option.label}
              aria-label={option.label}
              variant={option.id === selected ? 'filled' : 'outlined'}
              color={option.id === selected ? 'primary' : 'default'}
              sx={{ width: 110, height: 40 }}
              onClick={() => {
                !!onSelect && onSelect(option.id)
                setSelected(option.id)
              }}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
