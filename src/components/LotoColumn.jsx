import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

LotoColumn.propTypes = {
    cell: PropTypes.string.isRequired,
    onChangeCell: PropTypes.func.isRequired,
    maxNumber: PropTypes.number.isRequired
}
export default function LotoColumn({cell, onChangeCell, maxNumber}){
    const [cellNumber, setCellNubmer] = useState(cell);
    const [cellTitle, setCellTitle] = useState(cellNumber);
    const [readyToEdit, setReadyToEdit] = useState(false);

    useEffect(() => {
        setCellNubmer(cell);

    },[cell, readyToEdit]);

    const changeCell = useCallback((e) => {
        e.preventDefault();

        const newNumber = onChangeCell();

        setCellNubmer(newNumber);
    },[onChangeCell]);

    const onSaveNumber = useCallback(event => {
        event.preventDefault();
        const {value} = event.target.elements.editedCell;

        setCellNubmer(value);

        setReadyToEdit(false);
    },[]);

    const onReadyToEdit = useCallback((e) => {
        e.preventDefault();

        setReadyToEdit(true);
    },[])

    const changeDropDown = (e) =>{
        setCellTitle(e.target.textContent)
    }

    const dropDown = (
        <Dropdown>
            <Dropdown.Toggle 
                name="editedCell"
                className='loto-cell__button cell-dropdown'>
                    {cellTitle}
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
                {Array.from(Array(maxNumber), (e, i) => {
                    const number = i + 1;
                    return <Dropdown.Item key={i} onClick={changeDropDown}>{number}</Dropdown.Item>

                })}
            </Dropdown.Menu>
      </Dropdown>
    )
    return (
        <td className='loto-cell'>
            <form onSubmit={onSaveNumber}>
                {
                    !readyToEdit 
                    ? <button className='loto-cell__button' onClick={changeCell}>{cellNumber}</button>
                    : dropDown
                }

                <div className={`loto-cell__buttons-to-edit ${readyToEdit ? "show" : ''}`}>
                    {
                        !readyToEdit 
                            ? <button 
                                type='button'
                                className="buttons-to-edit__edit" 
                                onClick={onReadyToEdit}>
                                    Editar
                            </button>

                            : <>
                                <button 
                                    type='submit'
                                    className="buttons-to-edit__accept">v</button>

                                <button 
                                    type='button'
                                    className="buttons-to-edit__close" 
                                    onClick={(e) => setReadyToEdit(false)}>x</button>

                            </>
                    }
                    
                </div>
            </form>
        </td>
    )
}