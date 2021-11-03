import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

import Ball from "./Ball";

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}; //훅스 안쓰는애들은 빼놓으면 좋음

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo = 값을 기억함
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    //hooks는 순서가 매우 중요하다!
    //00문 안에는 넣지말것

    useEffect(() => {
        console.log('시작!');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => { // timeouts.current[i]가 바뀌는게 아님
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]])
            }, (i * 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setRedo(true);
            setBonus(winNumbers[6]);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
    //배열에 요소가 있으면 componetDidMount와 componentDidUpdate 둘 다 수행 

    const onClickRedo = useCallback(() => { // useCallback = 함수자체를 기억해 둔다.
        console.log('onclick');             // 만약 자식컴포넌트로 함수를 넘길경우 필수로 사용해야한다.
        console.log(winNumbers)
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]); //기억력이 너무 좋아서 까먹게함

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            {redo ? <><div>보너스!</div>{bonus && <Ball number={bonus} />}<button onClick={onClickRedo}>한 번 더!</button></> : null}

        </>
    );
};

export default Lotto;