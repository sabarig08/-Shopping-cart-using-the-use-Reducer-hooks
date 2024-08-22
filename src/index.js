import React from 'react';
import ReactDOM from 'react-dom';
import Shop from './Component/Shop';
function Shopping(){
  return(
    <div>
      <Shop/>
    </div>
  )
}
ReactDOM.render(<Shopping/>,document.getElementById('root'));