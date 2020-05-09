import { connect } from "react-redux";
import { IAppState } from "../../../redux/reducers/base.reducer";
import { ThunkDispatch } from "redux-thunk";
import { IGetGameInput, getGame } from "../../../redux/actions/game.actions";
import { AnyAction } from "redux";
import React, { useState, useEffect } from "react";
import { Button, IconButton, LinearProgress } from "@material-ui/core";
import { history } from "../../../redux/store/base.store";
import ChatApp from "../../shared/chat/chat.component";
import { cardsConstants } from "../../../entities/constants/cards.constants";
// import { CardsConstants } from "../../../entities/constants/cards.constants";
// import unoOros from "../../../assets/cards/uno_oros.svg";
import './game.component.scss';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SportsMmaIcon from '@material-ui/icons/SportsMma';
import classNames from "classnames";
import HealingIcon from '@material-ui/icons/Healing';

const gameProps = (state: IAppState) => {
    return { game: state.gameState.game }
}

// TODO: improve ThunkDispatch<any, any, AnyAction
function gameActions(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
      getGame: (game: IGetGameInput) => dispatch(getGame(game))
    };
}
  
type TBoardProps = ReturnType<typeof gameProps> & ReturnType<typeof gameActions> ;

const ConnectedGame = (props: TBoardProps) => {
    const onclickOut = () => history.push('/site');
    const cards = require.context('../../../assets/cards', true);

    // const map = new CardsConstants().map();
    // const unoOros = map.get('oro_1')?.iconPNG;
    // const unoOros = CardsConstants.ORO_1_OBJ.iconPNG;

    const orosUno = cardsConstants.oro[1];
    const orosCaballo = cardsConstants.oro[11];
    const espadaUno = cardsConstants.espada[1];

    let unoOrosPng = cards('./' + orosUno + '.png');
    let caballoOrosPng = cards('./' + orosCaballo + '.png');
    let unoEspadasPng = cards('./' + espadaUno + '.png');


    const [myAvatarOptionsHide, setMyAvatarOptionsHide] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
          }
      
        const timer = setInterval(tick, 500);
        return () => {
            clearInterval(timer);
        };
    });

    const onClickMyAvatar = () => {
        setMyAvatarOptionsHide(!myAvatarOptionsHide)
    }

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
                    </div>
                    <div className="cards">
                        <img src={unoOrosPng} alt=""></img>
                        <img src={caballoOrosPng} alt=""></img>
                        <img src={unoEspadasPng} alt=""></img>
                    </div>
                </div>
            </div>
            <ChatApp></ChatApp>
        </div>
    );
}

const Game = connect(gameProps, gameActions)(ConnectedGame);

export default Game;
