import React from 'react';
import { connect } from "react-redux";
import { IPlannerReducer, IPlannerState } from '../../redux/reducers/planner.reducers';
import TableSizeSelector from './tableSizeSelector/tableSizeSelector';
import Table from './table/table';

const tableSizeProps = (state: IPlannerReducer) => {
  return { tableSize: state.planner.tableSize }
}

const ConnectedSize = (planner: IPlannerState )=> (
  <div>
    <h1>
      Tamaño de la mesa seleccionada: 
      <span>
        {planner.tableSize}
      </span>
    </h1>
    <TableSizeSelector/>
    <Table/>
  </div>

);

const Planner = connect(tableSizeProps)(ConnectedSize);

export default Planner;