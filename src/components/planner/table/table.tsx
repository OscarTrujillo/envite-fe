import React, { Component } from 'react';
import Seat from '../seat/seat';
import { IPlannerReducer } from '../../../redux/reducers/planner.reducers';
import { connect } from 'react-redux';

const tableSizeProps = (state: IPlannerReducer) => {
    return { tableSize: state.planner.tableSize }
}

class ConnectedTable extends Component {
    render() {
        const seats = [];
        for (let i = 0; i < (this.props as any).tableSize; i++) {
            seats.push(<Seat/>)
        }
        return (
            <div>
                {seats}
            </div>
        );
    }

}


const Table = connect(tableSizeProps)(ConnectedTable);

export default Table;
