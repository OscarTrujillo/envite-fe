import { IPlannerReducer } from "../../../redux/reducers/planner.reducer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectPlayerNumber } from "../../../redux/actions/planner.action";
import { Dispatch, AnyAction } from "redux";
import { RadioGroup, FormControlLabel, Radio, FormControl } from "@material-ui/core";

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
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.selectPlayerNumber(+event.target.value as 4|6|8);
  }
  render() {
    const {tableSize} = this.props;
    return (
        <FormControl component="fieldset">
          <RadioGroup aria-label="size" name="size" value={String(tableSize)} onChange={this.handleChange}>
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="6" control={<Radio />} label="6" />
            <FormControlLabel value="8" control={<Radio />} label="8" />
          </RadioGroup>
        </FormControl>
    );
  }
}

  const TableSizeSelector = connect(tableSizeProps, mapDispatchToProps)(ConnectedTableSizeSelector);
  
  export default TableSizeSelector;   