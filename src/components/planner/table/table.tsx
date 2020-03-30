import React, { Component, PureComponent } from 'react';
import Seat from '../seat/seat';
import { IPlannerReducer } from '../../../redux/reducers/planner.reducers';
import { connect } from 'react-redux';

const tableSizeProps = (state: IPlannerReducer) => {
    return { tableSize: state.planner.tableSize }
}

type TtableSizeProps = ReturnType<typeof tableSizeProps>;

class ConnectedTable extends Component<TtableSizeProps, {}> {
    render() {
        const seats = [];
        for (let i = 0; i < this.props.tableSize; i++) {
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
