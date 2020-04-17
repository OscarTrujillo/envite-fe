import { IPlannerReducer } from "../../../../redux/reducers/planner.reducer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRoundTime } from "../../../../redux/actions/planner.actions";
import { Dispatch, AnyAction } from "redux";
import { RadioGroup, FormControlLabel, Radio, FormControl } from "@material-ui/core";
import { TroundTimeOptions } from "../../../../entities/game.entity";

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    selectRoundTime: (number: TroundTimeOptions) => dispatch(selectRoundTime(number))
  };
}

const roundTimeProps = (state: IPlannerReducer) => {
  return { roundTime: state.planner.roundTime }
}

type TroundTimeProps = ReturnType<typeof roundTimeProps> & ReturnType<typeof mapDispatchToProps>;

class ConnectedRoundTimeSelector extends Component<TroundTimeProps, {}> {
  constructor(props: TroundTimeProps) {
    super(props);
    this.state = {
        roundTime: '30s'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.selectRoundTime(event.target.value as TroundTimeOptions);
  }
  render() {
    const {roundTime} = this.props;
    return (
      <FormControl component="fieldset">
        <RadioGroup aria-label="size" name="size" value={String(roundTime)} onChange={this.handleChange}>
          <FormControlLabel value="30s" control={<Radio />} label="30s" />
          <FormControlLabel value="60s" control={<Radio />} label="60s" />
          <FormControlLabel value="90s" control={<Radio />} label="90s" />
          <FormControlLabel value="180s" control={<Radio />} label="180s" />
          <FormControlLabel value="no-lomits" control={<Radio />} label="-" />
        </RadioGroup>
      </FormControl>
    );
  }
}

const RoundTimeSelector = connect(roundTimeProps, mapDispatchToProps)(ConnectedRoundTimeSelector);
  
export default RoundTimeSelector;   