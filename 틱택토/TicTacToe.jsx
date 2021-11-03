import React, { useCallback, useReducer, useState, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: "O",
    tableData: [
        ['', '', '',],
        ['', '', '',],
        ['', '', '',],
    ],
    recentCell: [-1, -1],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            //state.winner = action.winner; 이렇게하면 안된데여.
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:
            const tableData = [...state.tableData]; // 얕은복사?  불변성이 매우매우매우 중요하단다
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            };
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        case RESET_GAME:
            return {
                ...state,
                winner: '',
                turn: "O",
                tableData: [
                    ['', '', '',],
                    ['', '', '',],
                    ['', '', '',],
                ],
                recentCell: [-1, -1],
            }
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState(0);
    // const [tableData, setTableData] = useState([['', '', '',], ['', '', '',], ['', '', '',]]);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => { //비동기를 처리할 떄는 useEffect!!
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win, row, cell, tableData, turn);
        if (win) {
            dispatch({ type: SET_WINNER, winner: turn });
            setTimeout(() => {
                dispatch({ type: RESET_GAME });
            }, 1500)
        } else {
            let all = true; // all이 true면 무승부
            tableData.forEach((row) => { //무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
            //무승부 검사
            // dispatch({ type: CHANGE_TURN });
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {state.winner ? <div>{winner}님의 승리!!!</div> : null}
        </>
    );
};

export default TicTacToe;