import React, {useState, useEffect} from 'react';
import './ToDo.css';
import Icon from './assets/list.png';

function ToDoList() {
  const listLocalStorage = localStorage.getItem('list');
  const [list, setList] = useState(listLocalStorage ? JSON.parse(listLocalStorage) : []);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  function addItem(form) {
    form.preventDefault();
    if(!newItem) {
      return;
    } 
    setList([...list, {text: newItem, isDone: false}]);
    setNewItem('');
    document.getElementById('inputEntada').focus();
  }

  function clicou(index) {
    const listAux = [...list];
    listAux[index].isDone = !listAux[index].isDone;
    setList(listAux);
  }

  function deleteItem(index) {
    const listAux = [...list];
    listAux.splice(index, 1);
    setList(listAux);
  }

  function deleteAllItems() {
    setList([]);
  }

  return (
    <>
    <section>
      <div>
        <h1 style={{color:'#fff' }}>Lista de Tarefas</h1>

        <form onSubmit={addItem}>
          <input id='inputEntada' type="text" value={newItem} onChange={(ev) => {setNewItem(ev.target.value)}} placeholder='Adicione uma tarefa' />

          <button className='add'>Adicionar</button>
        </form>

        <div className='ListToDo'>
          <div>
            {
              list.length < 1 
              ? 
              <img className='Icon' src={Icon} alt="Nenhuma tarefa adicionada" />
              :
              list.map((item, index) => (
                <div className={item.isDone ? 'item Done' : 'item'} key={index}>
                  <span onClick={() => {clicou(index)}}>{item.text}</span>
                  <button onClick={() => {deleteItem(index)}} className='delete'>Deletar</button>
                </div>
              ))
            }
            {
              list.length > 0 && (
                <button onClick={() => {deleteAllItems()}} className='deleteAll'>Deletar Tudo</button>
              )
            }
          </div>
        </div>
      </div>
    </section>

    </>
  )

}
export default ToDoList; 