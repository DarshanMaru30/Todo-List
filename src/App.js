import "./App.css";
import { useState } from "react";

function App() {
  const [val, setval] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [final, setFinal] = useState([]);

  const add = () => {
    if (edit !== null) {
      const updated = [...todo];
      updated[edit] = { val: val, checked: false };
      setTodo(updated);
      setFinal(updated);
      setEdit(null);
      setval("");
    } else {
      setTodo([...todo, { val: val, checked: false }]);
      setFinal([...todo, { val: val, checked: false }]);
      setval("");
    }
  };

  const del = (index) => {
    console.log("index = " + index);
    let d = todo.filter((val, id) => {
      console.log("id =", id);
      return id !== index;
    });
    setTodo(d);
    setFinal(d);
  };

  const update = (index) => {
    setEdit(index);
    setval(todo[index].val);
  };

  const handlecheck = (index) => {
    const check = [...todo];
    check[index].checked = !check[index].checked;
    setTodo(check);
    setFinal(check);
  };

  const searchhanlder = () => {
    let info = todo.filter((val, id) => {
      return val.val === search;
    });
    setTodo(info);
  };

  const completed = () => {
    let com = final.filter((val, id) => {
      return val.checked === true ? val : "";
    });
    setTodo(com);
  };

  const uncompleted = () => {
    let uncom = final.filter((val, id) => {
      return val.checked === false;
    });
    setTodo(uncom);
  };

  const all = () => {
    var data = [...final];
    setTodo(data);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Todo List</h1>
        <div className="form">
          <input type="text" className="input" value={val} placeholder="Enter val" onChange={(e) => {
              setval(e.target.value);
            }}
          />
          <input type="button" className="btn" value={"Add val"} onClick={() => {
              add();
            }}
          />
          <br />
          <input type="text" className="input" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
          />
          <input type="button" className="btn" value={"Search"} onClick={() => {
              searchhanlder();
            }}
          />
          <br />
          <br />
          <input type="button" className="btn btn1" value={"Completed"} onClick={() => {
              completed();
            }}
            style={{ marginRight: "10px" }}
          />
          <input type="button" className="btn btn1" value={"UnCompleted"} onClick={() => {
              uncompleted();
            }}
            style={{ marginRight: "10px" }}
          />
          <input type="button" className="btn btn1" value={"All"} onClick={() => {
              all();
            }}
            style={{ marginRight: "10px" }}
          />
        </div>

        <table className="" align="center" style={{ marginTop: "20px" }} border={5}
        >
          <tr>
            <td>Checkbox</td>
            <td>List</td>
            <td>Delete</td>
            <td>Edit</td>
          </tr>

          {todo.map((ele, index) => {
            return (
              <tr className="todo" key={index}>
                <td>
                  <input type="checkbox" onChange={() => handlecheck(index)} checked={ele.checked}
                  />
                </td>
                <td>
                  <span
                    style={{
                      textDecoration: ele.checked ? "line-through" : "",
                    }}
                  >
                    {ele.val}
                  </span>
                </td>
                <td>
                  <input type="button" value={"Delete"} className="del" onClick={() => {
                      del(index);
                    }}
                  />
                </td>
                <td>
                  <input type="button" value={"Edit"} className="del" onClick={() => {
                      update(index);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
