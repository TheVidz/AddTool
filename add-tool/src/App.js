import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { computeHeadingLevel } from '@testing-library/react';
function Row(){
  const [edit_mode,set_edit_mode]=React.useState(false);
  const [enabled,set_enabled]=React.useState(true);
  const [data,set_data]=React.useState("Argument Type");
  const [title,set_title]=React.useState("Argument Name");
  function toggle_edit_mode(){
    set_edit_mode(!edit_mode);
  }
  function save_row(e){
    e.preventDefault();
    set_edit_mode(!edit_mode);
  }
  function delete_row(){
    set_enabled(false);
  }
  function is_enabled(){
    if(enabled) return true;
    else return false;
  }
  if(enabled){
    if(edit_mode){
      return (
        <><div className='edit_mode_container'>

          <textarea value={title} className='edit_title_area' onChange={(e) => { set_title(e.target.value); } } rows={1}></textarea>
          <select onChange={(e) => { set_data(e.target.value); } }>
  <option value="string">String</option>
  <option value="array">Array</option>
  <option value="int">int</option>
  <option value="float">float</option>
</select>
        </div><input type="button" onClick={save_row} value="Save" className='save_button' /></>
            
      );
    }else{
      return (
        <div className='static_mode_container' onClick={toggle_edit_mode}>
        <div className='static_row'>
          <div className='row_title'>{title}</div>
          <div className='row_data'>{data}</div>
        </div>
          <button className='delete_button' onClick={()=>delete_row()}>-</button>
        </div>
      );
    }
  }else{
    return;
  }
}


export default function App() {
  const [rows,set_rows]=React.useState([<Row key={0}/>]);
  const [idx,set_index]=React.useState(1);

  function add_row(){
    set_index(idx+1);
    set_rows(rows.concat(<Row key={idx}/>));
  }
  function getData(){
    const rowTitle=document.getElementsByClassName('row_title')
    const rowData=document.getElementsByClassName('row_data')
    let data=Array()
    for(let i=0;i<rowData.length;i++){
      let element=Object();
      element.title=rowTitle[i].innerHTML;
      element.data=rowData[i].innerHTML;
      data.push(element)
    }
     for(let i=0;i<rowData.length;i++){
       console.log(data[i].title+" : "+data[i].data)
     }
    return data;
  }
 return (
  <div className='main_container'>
    <input placeholder="Name of Tool"></input>
    {rows}
    <button className='add_row_button' onClick={()=>{
      add_row();
    }}>Add row</button>
    <button onClick={getData}>Submit Tool</button>
    
    
     
      
  </div>
 );
}