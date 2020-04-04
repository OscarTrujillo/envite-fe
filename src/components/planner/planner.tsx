import React from 'react';
import { connect } from "react-redux";
import { IPlannerReducer, IPlannerState } from '../../redux/reducers/planner.reducer';
import TableSizeSelector from './tableSizeSelector/tableSizeSelector';
import Table from './table/table';
import { Grid } from '@material-ui/core';
import './planner.scss';

const tableSizeProps = (state: IPlannerReducer) => {
  return { tableSize: state.planner.tableSize }
}

const ConnectedSize = (planner: IPlannerState )=> (
  <div className="planner">
    <h1>
      Tamaño de la mesa seleccionada: 
      <span>
        {planner.tableSize}
      </span>
    </h1>
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <TableSizeSelector/>
      </Grid>
      <Grid item xs={10}>
        <Table/>
      </Grid>
    </Grid>
  </div>

);

const Planner = connect(tableSizeProps)(ConnectedSize);

export default Planner;