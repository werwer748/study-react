import React, { PureComponent } from 'react';

class Try extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     // 다른 동작
    //     state = {
    //         result: this.props.result,
    //         try: this.props.try,
    //     };
    // }
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
                {/* {this.props} */}
            </li>
        );
    }
}

export default Try;