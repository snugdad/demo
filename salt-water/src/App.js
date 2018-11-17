import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { LiquidTraceGrid as Grid } from './components'
import { GridColumn as Column } from '@progress/kendo-react-grid'
import { connect } from 'react-redux'
import { gridsMeta } from './dataHeaders'
import { bindActionCreators } from 'redux';
import { GridBar } from './components/grid-bar'
import { fetchUsers, fetchTodos, fetchComments } from './actions/api'
import instance from './axiosconfig';



class App extends Component {

  componentDidMount() {
    
  }
  
  render() {
    const { fetchUsers, fetchTodos, gridIndex, fetchComments} = this.props
    const grids = gridIndex.map((gridKey) => {
      const { grid, collection } = this.props[gridKey]
      return <Grid id={gridKey} header={grid} data={collection.data}/>
    })
    return (
      <React.Fragment>
      <GridBar grids={grids}/>
      <button onClick={fetchUsers}>
        Get Users
      </button>
      <button  onClick={fetchTodos}>
        Get Todos
      </button>
      <button  onClick={fetchComments}>
        Get Comments
      </button>
  </React.Fragment>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.tables.todos,
    users: state.tables.users,
    comments: state.tables.comments,
    haulers: state.tables.haulers,
    gridIndex: state.gridIndex,
  }
}

const  mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchTodos: () => {dispatch(fetchTodos())},
    fetchComments: () => {dispatch(fetchComments())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
