import { useState } from 'react';
import './App.css';

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [editId, seteditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editId){
      const editTodo=Todos.find((i)=>i.id===editId);
      const updatedTodo=Todos.map((t)=>t.id === editTodo.id
       ? (t={id:t.id,Todo})
       :{id:t.id,Todo:t.Todo})
      setTodos(updatedTodo)
      seteditId(0);
      setTodo("");
      return;
    }
   
    if (Todo !== '') {
      setTodos([{ id: `${Todo}-${Date.now()}`, Todo }, ...Todos]);
      setTodo(""); 
      // Resetting the input field after adding a todo
    }
  };

  const handleDelete = (id) => {
    const delTodos = Todos.filter((t) => t.id !== id);
    setTodos(delTodos);
    
  };

  const handleEdit=(id)=>{
    const editTodo=Todos.find((i)=>i.id===id);
    setTodo([editTodo.Todo]);
    seteditId(id);


  }

  return (
    <div className="app">
      <div className="container">
        <h1>To Do List </h1>
        <form className="todoform" onSubmit={handleSubmit}>
          <input type="text" value={Todo} onChange={(e) => setTodo(e.target.value)} />
          <button type="submit" >{editId ? "edit" : "Add"}</button>
        </form>
        <ul className="alltodos">
          { Todos.map((t) => (
            <li className="singletodo" key={t.id}>
              <span className="todotext">{t.Todo} </span>
              <button onClick={()=>handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
