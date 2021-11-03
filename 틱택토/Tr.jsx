import React, { useRef, useEffect, memo, useMemo } from "react";

import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log('tr render');

    const ref = useRef([]);
    useEffect(() => { //리렌더링의 이유를 찾자!
        console.log(rowIndex === ref.current[0], dispatch === ref.current[1], rowData === ref.current[2]);
        console.log('ㄴㄴ?', rowData, ref.current[2]);
        ref.current = [rowIndex, dispatch, rowData];
    }, [rowIndex, dispatch, rowData]);

    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                useMemo(
                    () => <Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]]
                )
            ))}
        </tr>
    );
});

export default Tr;