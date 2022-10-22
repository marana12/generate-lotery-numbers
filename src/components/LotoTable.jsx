import LotoRow from "./LotoRow"
import PropTypes from 'prop-types';
import { useState, useRef, useCallback } from "react";
import { useEffect } from "react";

LotoTable.propTypes = {
    generatedNumbers: PropTypes.array.isRequired,
}
export default function LotoTable({generatedNumbers}){
    const [generatedRow, setGeneratedRow] = useState(generatedNumbers);
    const rowRef = useRef();

    useEffect(() => {
        setGeneratedRow(generatedNumbers);
    },[generatedNumbers, generatedRow]);

    const handlerChangeRow = useCallback((index) => {
        const currentRow = rowRef.current?.row;

        const rows = generatedRow;

        if(rows?.[index]){
            rows[index] = currentRow;
    
            setGeneratedRow(rows)
        }
        
    },[generatedRow, setGeneratedRow]);

    return (
        <table className='loto-table'>
            <tbody>
                {
                    generatedRow?.map((columns, index) =>
                        <LotoRow 
                            key={index} 
                            columns={columns}
                            rowRef={rowRef}
                            rowNumber={index + 1}
                            onHandlerChangeRow = {() => handlerChangeRow(index)} 
                        /> )
                }
            </tbody>
        </table>
    );
}