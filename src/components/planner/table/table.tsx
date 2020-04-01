import React, { Component } from 'react';
import Seat from '../seat/seat';
import { IPlannerReducer } from '../../../redux/reducers/planner.reducers';
import { connect } from 'react-redux';
import { Card, CardContent, GridList, GridListTile, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './table.scss';


const tableSizeProps = (state: IPlannerReducer) => {
    return { tableSize: state.planner.tableSize }
}

type TtableSizeProps = ReturnType<typeof tableSizeProps>;

class ConnectedTable extends Component<TtableSizeProps, {}> {
    render() {
        // const seats = [];
        // for (let i = 0; i < this.props.tableSize; i++) {
        //     seats.push(<Seat/>)
        // }
        return (
            <div className="table">

                <Grid container spacing={2} >
                    <Grid item className="tableColumn">
                        <GridList cellHeight={80} cols={1} spacing={16}>
                            <GridListTile key='1' cols={1} rows={1}>
                                <Card className="invitedCard" variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                            <GridListTile key='4' cols={1}>
                                <Card className={this.props.tableSize > 4 ? 'invitedCard' : 'disabledCard'} variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                            <GridListTile key='6' cols={1} rows={1}>
                                <Card className={this.props.tableSize > 6 ? 'invitedCard' : 'disabledCard'} variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        </GridList>
                    </Grid>
                    <Grid item className="tableColumn">
                        <GridList cellHeight={80} cols={1} spacing={16}>
                            <GridListTile key='userGrid' className="gridListUserName" cols={1} rows={2}>
                                <Card className="userCard" variant="outlined">
                                        <CardContent>
                                            {'"John Doe"'}
                                        </CardContent>
                                </Card>
                            </GridListTile>
                            <GridListTile key='3' cols={1} rows={1}>
                                <Card className="invitedCard" variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        </GridList>
                    </Grid>
                    <Grid item className="tableColumn">
                        <GridList cellHeight={80} cols={1} spacing={16}>
                            <GridListTile key='2' cols={1} rows={1}>
                                <Card className="invitedCard" variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                            <GridListTile key='5' cols={1}>
                                <Card className={this.props.tableSize > 4 ? 'invitedCard' : 'disabledCard'} variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                            <GridListTile key='7' cols={1} rows={1}>
                                <Card className={this.props.tableSize > 6 ? 'invitedCard' : 'disabledCard'} variant="outlined">
                                    <CardContent>
                                        <AddIcon/>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        </GridList>
                    </Grid>
                </Grid>

                {/* {seats} */}
            </div>
        );
    }

}


const Table = connect(tableSizeProps)(ConnectedTable);

export default Table;
