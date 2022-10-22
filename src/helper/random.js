export function getRandom(max){
    max++;
    const min = 1;

    return String(Math.floor(Math.random() * (max - min) + min));
}

export function getUniqueRandomNumber(max, arr = [], atRandomNumber = 0){
        var run = true;
        var number = 0;
        
        while(run){
            if(atRandomNumber > 0 ){

                run = arr.includes(atRandomNumber);

                number = atRandomNumber;

                continue;
            }
            const randomNumber = getRandom(max)
            
            number = randomNumber;
            
            run = arr.includes(randomNumber);
        }
        
        return number;
}

export function getRandomToArray(max, arr = []){
    if(arr.length === 0){
        return getRandom(max);
    }
    
    return getUniqueRandomNumber(max, arr);
}

export function generateLotoTable(countTablesRows = 10, countTableColumns = 6){
    const tableArray = [];

    for(var rowIndex = 0; rowIndex < countTablesRows; rowIndex++){
        const rowArray = [];
        
        for(var columnIndex = 0; columnIndex < countTableColumns; columnIndex++){
            rowArray.push(getRandom(37, rowArray));
        }
        
        const sortedArray = rowArray.sort();

        const strongNumber = getUniqueRandomNumber(7);
        
        sortedArray.push(strongNumber);
        
        tableArray.push(sortedArray);
    }

    return tableArray;
}

export function restartTable(countTablesRows = 10, countTableColumns = 7){
    const rowsArr = [];

    for(var rowsCount = 0; rowsCount < countTablesRows; rowsCount++){
        const columnArr = [];

        for(var columnsCount = 0; columnsCount < countTableColumns; columnsCount++){
            columnArr.push("");
        }

        rowsArr.push(columnArr);
    }

    return rowsArr;
}