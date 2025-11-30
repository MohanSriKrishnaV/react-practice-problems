import {  useEffect, useState } from "react";

export default function ToDo() {

    const [item, setitem] = useState("");
    const [list, setlist] = useState([]);


    useEffect(() => {
        const x = localStorage.getItem("ToDoList") ? JSON.parse(localStorage.getItem("ToDoList")) : [];
        if (x.length > 0) {
            setlist(x);
        }
    }, []);


    const addItem = () => {
        if (item.trim() !== "") {
            const updatedList = [...list, { item: item, completed: false }];
            setlist(updatedList);
            localStorage.setItem("ToDoList", JSON.stringify(updatedList));
            setitem("");
        }
    }

    const changeItem = (i, s, e) => {
        const updatedlist = list.map((item, index) =>
            index === i ? { ...item, completed: e } : item
        );
        setlist(updatedlist);
        localStorage.setItem("ToDoList", JSON.stringify(updatedlist));
    }

    const deleteItem = (i) => {
        const updatedlist = list.filter((item, index) => index !== i);
        setlist(updatedlist);
        localStorage.setItem("ToDoList", JSON.stringify(updatedlist));
    }

    const clearList = () => {  
        setlist([])
                localStorage.setItem("ToDoList", JSON.stringify([]));

    }
    return (
        <div style={{ padding: "20px", textAlign: "center" }}    >

            <h3>To Do</h3>
            <input type="text" placeholder="Add To Do Item" id="toDoInput" value={item} onChange={(e) => { setitem(e.target.value) }} /><span onClick={addItem}>Add Item</span>
            {list.length === 0 ? <li>No Items</li> :
                <ul>
                    {list.map((itm, index) =>
                        <li key={index}>
                            <input type="checkbox" checked={itm.completed} onChange={(e) => changeItem(index, itm.completed, e.target.checked)} ></input>

                            {itm.item}
                            <button onClick={() => deleteItem(index)}>delete</button>
                        </li>
                    )}
                </ul>}
            <button onClick={clearList}>cLEAR</button>
        </div>
    );
}