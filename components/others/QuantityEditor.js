

import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

function QuantityEditor({ increase, decrease, quantity, simple }) {
    return (
        <ButtonGroup size='small' variant="outlined" aria-label="outlined button group">
            <Button fontSize='small' onClick={increase}>+</Button>
            <Button size='small'>{quantity}</Button>
            <Button size='small' onClick={decrease}>-</Button>
        </ButtonGroup>
    )
}

export default QuantityEditor