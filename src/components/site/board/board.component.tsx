import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import Table from "./table/table.component";
import { IAppState } from '../../../redux/reducers/base.reducer';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IGetGameInput, getGame } from '../../../redux/actions/game.actions';
import { history } from "../../../redux/store/base.store";
import { Paper, InputBase, Divider, IconButton, makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import CopyToClipboard from 'react-copy-to-clipboard';
import ChatApp from "../../shared/chat/chat.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      marginTop: 10,
    },
    input: {
    //   marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    buttonContainer: {
        marginTop: 20,
    },
  }),
);

const boardProps = (state: IAppState) => {
    return { game: state.gameState.game }
}

// TODO: improve ThunkDispatch<any, any, AnyAction
function boardActions(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
      getGame: (game: IGetGameInput) => dispatch(getGame(game))
    };
  }
  

type TBoardProps = ReturnType<typeof boardProps> & ReturnType<typeof boardActions> ;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ConnectedBoard = (props: TBoardProps) => {
    const classes = useStyles();
    const queryId = useQuery().get('id');
    const currenturl = window.location.href;

    const onclickOut = () => history.push('/site');

    const initGame = () => {
        console.log('init game');
    }

    if (queryId) {
        if (props.game?.id !== queryId) {
            props.getGame({_id: queryId});
        }
        return (
            <div>
                {props.game?.id === queryId ? 
                    <div>  
                        <Button
                            variant="outlined"
                            onClick={onclickOut}
                            >
                            Salir
                        </Button>
                        <Table/>
                        <div className={classes.buttonContainer}>
                            <Paper component="form" className={classes.root}>
                                <InputBase
                                    value={currenturl}
                                    className={classes.input} 
                                />
                                <Divider orientation="vertical" className={classes.divider}/>
                                <CopyToClipboard text={currenturl}>
                                    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                        <FilterNoneIcon />
                                    </IconButton>
                                </CopyToClipboard>
                            </Paper>
                            <Paper component="form" className={classes.root}>
                                <InputBase
                                    value={queryId}
                                    className={classes.input} 
                                />
                                <Divider orientation="vertical" className={classes.divider}/>
                                <CopyToClipboard text={queryId}>
                                    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                        <FilterNoneIcon />
                                    </IconButton>
                                </CopyToClipboard>
                            </Paper>
                        </div>
                        <div className="button-container">
                            <Button
                            variant="outlined"
                            onClick={initGame}
                            >
                            Iniciar partida
                            </Button>
                        </div>
                        <ChatApp></ChatApp>
                    </div>
                    :
                    <p>waiting ...</p>
                }
                {/* TODO: waiting */}
            </div>
        )
    } else {
        history.push('/site');
    }
    return(
        <div>
            Not found
        </div>
    );
}

const Board = connect(boardProps, boardActions)(ConnectedBoard);

export default Board;
