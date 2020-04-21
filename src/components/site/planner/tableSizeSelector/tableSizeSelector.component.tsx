import { IPlannerReducer } from "../../../../redux/reducers/planner.reducer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectPlayerNumber } from "../../../../redux/actions/planner.actions";
import { Dispatch, AnyAction } from "redux";
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@material-ui/core";
import { TtableSizeOptions } from "../../../../entities/game.entity";

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    selectPlayerNumber: (number: TtableSizeOptions) => dispatch(selectPlayerNumber(number))
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
    this.props.selectPlayerNumber(+event.target.value as TtableSizeOptions);
  }
  render() {
    const {tableSize} = this.props;
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Size</FormLabel>
        <RadioGroup row aria-label="size" name="size" value={String(tableSize)} onChange={this.handleChange}>
          <FormControlLabel labelPlacement="bottom" value="4" control={<Radio />} label="4" />
          <FormControlLabel labelPlacement="bottom" value="6" control={<Radio />} label="6" />
          <FormControlLabel labelPlacement="bottom" value="8" control={<Radio />} label="8" />
        </RadioGroup>
      </FormControl>
    );
  }
}

const TableSizeSelector = connect(tableSizeProps, mapDispatchToProps)(ConnectedTableSizeSelector);
  
export default TableSizeSelector;   