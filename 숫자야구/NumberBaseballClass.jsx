import React, { Component, createRef } from 'react';
import Try from './TryClass';

function getNumbers() { // 숫자 4개 랜덤으로 뽑음
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [], // push 쓰면 안됨!!!
    };

    onSubmitForm = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            // console.log('맞음');
            this.setState((prevState) => { //옛날 스테이트로 현재스테이트를 만들어야할때
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!' }],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        } else {
            // console.log('틀림');
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.` }],
                        value: '',
                    }
                });
                this.inputRef.current.focus();
            };
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    inputRef = createRef();

    render() {
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 : `} tryInfo={v} index={i} />
                        );
                    })}
                </ul>
            </>
        );
    };
};

export default NumberBaseball; // import NumberBaseball;