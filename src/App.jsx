import { useCallback, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LotoTable from './components/LotoTable';
import {generateLotoTable, restartTable} from './helper/random';

function App() {
  const  started = () => {
    return restartTable()
  }

  const [totalRandomNumbers, setTotalRandomNumbers] = useState(started);

  const onGenerateTable = useCallback(() => {
    const randomTable = generateLotoTable();

    setTotalRandomNumbers(randomTable);
  },[setTotalRandomNumbers]);

  const onRestart = useCallback(() => {
    const resetedNumbers = restartTable();

    setTotalRandomNumbers(resetedNumbers);
  },[setTotalRandomNumbers]);

  return (
    <div className="App">     
        <LotoTable 
          generatedNumbers={totalRandomNumbers}
        />

        <div className='app-button'>
          <button 
            className='generate-button'
            onClick={onGenerateTable}>
              Generate Table
            </button>

            <button 
              className='restart-button'
              onClick={onRestart}>
                Reset
            </button>
        </div>
    </div>
  );
}

export default App;
