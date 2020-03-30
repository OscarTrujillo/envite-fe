import { IPlannerReducer } from "../../../redux/reducers/planner.reducers";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectPlayerNumber } from "../../../redux/actions/planner.actions";
import { Dispatch, AnyAction } from "redux";

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        selectPlayerNumber: (number: 4|6|8) => dispatch(selectPlayerNumber(number))
    };
}

const tableSizeProps = (state: IPlannerReducer) => {
    return { tableSize: state.planner.tableSize }
}

type TtableSizeProps = ReturnType<typeof tableSizeProps> & ReturnType<typeof mapDispatchToProps>;

class ConnectedTableSizeSelector extends Component<TtableSizeProps, {}> {
    constructor(props: TtableSizeProps) {
      super(props);
      this.state = {
        tableSize: 4
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: any) {
        this.props.selectPlayerNumber(+event.target.value as 4|6|8);
    }
    render() {
        const {tableSize} = this.props;
        return (
            <form>
                <div className="radio">
                    <label>
                    <input type="radio" value="4" 
                    onChange={this.handleChange}
                    checked={tableSize === 4}/>
                    4
                    </label>
                </div>
                <div className="radio">
                <label>
                    <input type="radio" value="6" 
                    onChange={this.handleChange}
                    checked={tableSize === 6}
                    />
                    6
                </label>
                </div>
                <div className="radio">
                <label>
                    <input type="radio" value="8" 
                    onChange={this.handleChange}
                    checked={tableSize === 8}
                    />
                    8
                </label>
                </div> 
            </form>
        );
    }
  }

  const TableSizeSelector = connect(tableSizeProps, mapDispatchToProps)(ConnectedTableSizeSelector);
  
  export default TableSizeSelector;   