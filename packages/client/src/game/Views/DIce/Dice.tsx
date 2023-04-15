import { Button } from 'antd';
import { FC, useEffect } from 'react';
import { useState } from 'react';

import './Dice.scss';

type Props = {
    speed: number;
    number: number;
    offset: number;
    diceId: number;
    resetKey: number;
    stopAnimate: any;
};


export const Dice = ({ speed = 2, number = 6, offset, diceId = 0, resetKey = 0, stopAnimate }: Props): JSX.Element => {

    const [view, setView] = useState(false);
    const endDiceAnimation = (e: any) => {
        if (Number(e.target.dataset['diceId']) === diceId) {
            setView(false);
            stopAnimate();
        }
    };

    const offsetStyle = {
        'left': `calc(50% + ${offset}px)`,
    };
    const animationStyle = {
        'animation': `rotate${number} ${speed}s`,
    };

    useEffect(() => {
        addEventListener('animationend', endDiceAnimation);
        return () => removeEventListener('animationend', endDiceAnimation);
    }, []);
    
    useEffect(() => {
        if (!resetKey) return;
        setView(true);
    }, [resetKey]);
    if (!number) return <></>
    return (
        <>
            <div className={`dice ${view ? 'view rotate' : ''} number-${number} `} style={view ? { ...animationStyle, ...offsetStyle } : { ...offsetStyle }} data-dice-id={diceId}>
                <div className="one side"><span className="pip"></span></div>
                <div className="two side">
                    <span className="pip"></span>
                    <span className="pip"></span>
                </div>
                <div className="three side">
                    <span className="pip"></span>
                    <span className="pip"></span>
                    <span className="pip"></span>
                </div>

                <div className="four side">
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                </div>
                <div className="five side">
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                    <div className="column">
                        <span className="pip"></span>
                    </div>
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                </div>
                <div className="six side">
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                </div>
            </div>

        </>
    );
};