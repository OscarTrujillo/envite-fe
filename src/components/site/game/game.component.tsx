import { connect } from "react-redux";
import { IAppState } from "../../../redux/reducers/base.reducer";
import { ThunkDispatch } from "redux-thunk";
import { IGetGameInput, getGame } from "../../../redux/actions/game.actions";
import { AnyAction } from "redux";
import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import { history } from "../../../redux/store/base.store";
import ChatApp from "../../shared/chat/chat.component";
import { cardsConstants } from "../../../entities/constants/cards.constants";
import './game.component.scss';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SportsMmaIcon from '@material-ui/icons/SportsMma';
import classNames from "classnames";
import HealingIcon from '@material-ui/icons/Healing';
import { useLocation } from "react-router";
import { cardEntity } from "../../../entities/card.entity";

const gameProps = (state: IAppState) => {
    return { 
        game: state.gameState.game,
        user: state.authentication.user,
        myHand: state.handState.myHand,
    }
}

// TODO: improve ThunkDispatch<any, any, AnyAction
function gameActions(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        getGame: (game: IGetGameInput) => dispatch(getGame(game))
    };
}
  
type TgameProps = ReturnType<typeof gameProps> & ReturnType<typeof gameActions> ;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ConnectedGame = (props: TgameProps) => {
    const onclickOut = () => history.push('/site');
    const cards = require.context('../../../assets/cards', true);
    const queryId = useQuery().get('id');
    console.log('my hand component', props.myHand);

    const getCardImage = (card: cardEntity) => {
        const cardName = cardsConstants[card.palo][card.valor];
        const cardImage = cards('./' + cardName + '.png');
        return cardImage;
    }

    const [myAvatarOptionsHide, setMyAvatarOptionsHide] = useState(true);
    // const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     function tick() {
    //         // reset when reaching 100%
    //         setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    //       }
      
    //     const timer = setInterval(tick, 500);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // });

    const onClickMyAvatar = () => {
        setMyAvatarOptionsHide(!myAvatarOptionsHide)
    }
    if (queryId) {
        if (props.game?.id !== queryId) {
            props.getGame({_id: queryId});
        } 
        // else {
        //     if (props.game.gameStatus !== 'Running') {
        //         history.push('/site/game?id=' + queryId);
        //     }
        // }
        return(
            <div className="game">
                <div className="gameHeader">
                    <Button
                        variant="outlined"
                        onClick={onclickOut}
                        >
                        Salir
                    </Button>
                    
                </div>
                <div className="gameBody">
                    {/* <LinearProgress variant="determinate" value={progress} /> */}
                    <div className="gameTop"></div>
                    <div className="gameMiddle"></div>
                    <div className="myCards">
                        <div className="avatar">
                            <div className={classNames({
                                    hide: myAvatarOptionsHide,
                                    options: true
                                })} >
                                <IconButton className="withMargin" color="primary" aria-label="photo" component="span">
                                    <HealingIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="sad" component="span">
                                    <SentimentSatisfiedAltIcon />
                                </IconButton>
                                <IconButton  className="withMargin" color="primary" aria-label="sad" component="span">
                                    <SportsMmaIcon />
                                </IconButton>
                            </div>
                            <img src="https://github.com/Thatkookooguy.png" alt="my-avatar" onClick={onClickMyAvatar}></img>
                            <div className="user-name">
                                <span>
                                    {props.user.username}
                                </span>
                            </div>
                        </div>
                        <div className="cards">
                            {   props.myHand?.map( card => {
                                    return (<img src={getCardImage(card)} alt=""></img>)
                                })
                            }
                        </div>
                    </div>
                </div>
                <ChatApp></ChatApp>
            </div>
        );
    } else {
        debugger;
        history.push('/site');
    }
    // TODO: not found page?
    return(
        <div>
            Not found
        </div>
    );

}

const Game = connect(gameProps, gameActions)(ConnectedGame);

export default Game;
