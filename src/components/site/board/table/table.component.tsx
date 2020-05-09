import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, GridList, GridListTile, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { IAppState } from '../../../../redux/reducers/base.reducer';
import { socket } from '../../../../socket/socket-client';
import './table.component.scss';

const tableProps = (state: IAppState) => {
	return {
		user: state.authentication.user,
		game: state.gameState.game,
	}
}

type TtableProps = ReturnType<typeof tableProps>;

const ConnectedTable = (props: TtableProps ) => {

	const onclickSeat = (seatPosition: number) => {
		// if position is not selected
		socket.sendSeat(seatTransformer(seatPosition) as number);
	}

	const seatTransformer = (position: number) => {
		const size = props.game.numberOfPlayers;
		switch(position) {
			case 0:
			case 1:
			case 2:
				return position;
			case 3:
				if(size === 4) {
					return undefined;
				} 
				if(size === 6) {
					return 3;
				}
				return position;
			case 4:
				if(size === 4 || size === 6) {
					return undefined;
				} 
				return position;
			case 5:
				if(size === 4) {
					return 3;
				} 
				if(size === 6) {
					return 4;
				}
				return position;
			case 6:
				if(size === 4 || size === 6) {
					return undefined;
				} 
				return position;
			case 7:
				if(size === 4) {
					return undefined;
				} 
				if(size === 6) {
					return 5;
				}
				return position;
		}
	}

	const seatUsedBy = (position: number) => {
		const pos = seatTransformer(position);
		if (pos !== undefined && props.game.table && props.game.table[pos]) {
			return props.game.table[pos].nickName;
		}
		return undefined;
	}

	return (
		<div className="table">
			<p>Sellecciona posicion en la mesa {props.user.username}</p>
			<Grid container spacing={2} >
				<Grid item className="tableColumn">
					<GridList cellHeight={80} cols={1} spacing={16}>
						<GridListTile key='0' onClick={() => onclickSeat(0)}>
							<Card className="readTeam" variant="outlined">
								<CardContent>
									{seatUsedBy(0) ? 
										seatUsedBy(0)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
						<GridListTile key='7' onClick={() => onclickSeat(7)}>
							<Card className={props.game.numberOfPlayers > 4 ? 'blueTeam' : 'disabledCard'} variant="outlined">
								<CardContent>
									{seatUsedBy(7) ? 
										seatUsedBy(7)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
						<GridListTile key='6' onClick={() => onclickSeat(6)}>
							<Card className={props.game.numberOfPlayers > 6 ? 'readTeam' : 'disabledCard'} variant="outlined">
								<CardContent>
									{seatUsedBy(6) ? 
										seatUsedBy(6)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
					</GridList>
				</Grid>
				<Grid item className="tableColumn">
					<GridList cellHeight={80} cols={1} spacing={16}>
						<GridListTile key='1' onClick={() => onclickSeat(1)}>
							<Card className="blueTeam" variant="outlined">
								<CardContent>
									{seatUsedBy(1) ? 
										seatUsedBy(1)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
						<GridListTile key='rug' className="rug">
							<Card className="rugCard" variant="outlined">
								<CardContent>
								</CardContent>
							</Card>
						</GridListTile>
						<GridListTile key='5' onClick={() => onclickSeat(5)}>
							<Card className={props.game.numberOfPlayers === 6 ? 'readTeam' : 'blueTeam'} variant="outlined">
								<CardContent>
									{seatUsedBy(5) ? 
										seatUsedBy(5)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
					</GridList>
				</Grid>
				<Grid item className="tableColumn">
					<GridList cellHeight={80} cols={1} spacing={16}>
						<GridListTile key='2' onClick={() => onclickSeat(2)}>
							<Card className="readTeam" variant="outlined">
								<CardContent>
									{seatUsedBy(2) ? 
										seatUsedBy(2)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
						<GridListTile key='3' onClick={() => onclickSeat(3)}>
							<Card className={props.game.numberOfPlayers > 4 ? 'blueTeam' : 'disabledCard'} variant="outlined">
								<CardContent>
									{seatUsedBy(3) ? 
										seatUsedBy(3)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
						<GridListTile key='4' onClick={() => onclickSeat(4)}>
							<Card className={props.game.numberOfPlayers > 6 ? 'readTeam' : 'disabledCard'} variant="outlined">
								<CardContent>
									{seatUsedBy(4) ? 
										seatUsedBy(4)
										:
										<AddIcon/>
									}
								</CardContent>
							</Card>
						</GridListTile>
					</GridList>
				</Grid>
			</Grid>
		</div>
	);
}

const Table = connect(tableProps)(ConnectedTable);

export default Table;
