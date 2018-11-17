import { Grid, GridColumn as Column } from '@progress/kendo-react-grid'
import React, { useState, useEffect } from 'react'


export default function LiquidTraceGrid(props) {
    const { header } = props
    const columns = header.index.map((key) => {
        return <Column key={key} field={key} title={header.columnNames[key]} reorderable/>  
    })
    return (
        <Grid data={props.data} reorderable>
        {columns}
        </Grid>
    )
}