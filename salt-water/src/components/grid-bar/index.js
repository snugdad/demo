import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'

export const GridContainer = (props) => {
    return (
      <Paper component="div" style={{ padding: 8 * 3 }} elevation={10}>
        {...props.children}
      </Paper>
    );
}

export const GridBar = (props) => {
    const [value, setValue] = useState(0);

    function handleTabSwitch(event, value) {
      setValue(value);
    }
  
    const { grids } = props;
    return (
      <React.Fragment>
      <AppBar position="static">
      <Tabs value={value} onChange={handleTabSwitch}>
        {grids.map((grid) => {
          const { id } = grid.props
          return <Tab key={`${id}-grid-tab`} label={id}/>
        })}
      </Tabs>
    </AppBar>
    {<GridContainer>{grids[value]}</GridContainer>}
 
    </React.Fragment>
    )
  }