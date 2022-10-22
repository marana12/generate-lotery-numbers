import LotoColumn from "./LotoColumn";
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from "react";
import { getUniqueRandomNumber } from '../helper/random';

LotoRow.propTypes = {
    columns: PropTypes.array.isRequired,
    rowRef: PropTypes.object.isRequired,
    onHandlerChangeRow: PropTypes.func.isRequired,
    rowNumber: PropTypes.number.isRequired
}
export default function LotoRow({columns, rowRef, onHandlerChangeRow, rowNumber}){
    const [columnsArr, setColumnsArr] = useState(columns);

    useEffect(() => {
        setColumnsArr(columns);
    },[columns, columnsArr]);
    
    const handlerChangeCell = useCallback((max, index) => {
        const columnArray = columns;

        columnArray[index] =  index + 1 < columnArray.length
            ? getUniqueRandomNumber(max, columnArray)
            : getUniqueRandomNumber(max);

        rowRef.current = {
            row: columnArray
        };
    
        setColumnsArr(columnArray);

        onHandlerChangeRow();

        return columnArray[index];
    },[columns, rowRef, onHandlerChangeRow, setColumnsArr]);

    return (
        <tr className="loto-column">
            <div>
                {`(${rowNumber})`}
            </div>
            {
                columnsArr?.map((cell, index) => 
                    {
                        const max = index + 1 === columnsArr.length ? 7 : 37;

                        return <LotoColumn 
                                    key={index}
                                    cell={cell} 
                                    onChangeCell={() => handlerChangeCell(max, index)}
                                    maxNumber={max}
                                    />
                    }

                )
            }
        </tr>
    );
}