import React, { useState } from "react";

const ToDo = () => {
    const [inputValue, setInputvalue] = useState("");
    const [list, setList] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
        // console.log(list);
        const id = new Date().getTime();
        setList([...list, { id: id, text: inputValue }]);
        setInputvalue("");
        console.log(list);
    }
    const handleDone = (id) => {
        // e.preventDefault();
        console.log(id);
        //  console.log(id);
        const newList = list.filter((p) => p.id !== id);
        setList(newList);
    }
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-6">
                        <form onSubmit={handleSubmit}>
                            <h4>ToDo</h4>
                            <input type="text" name="todo" id="todo" value={inputValue} onChange={(e) => setInputvalue(e.target.value)}></input>
                            <button type="submit" className="btn btn-primary m-1" >Add</button>
                        </form>
                        <div>
                            {list.map((p) => {
                                return (
                                    <div key={p.id}>
                                        <h4 >{p.text} <button type="submit" className="btn btn-success" onClick={() => handleDone(p.id)}>Done</button></h4>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <button type="reset" className="btn btn-danger" onClick={() => setList([])}>Reset</button>
                        </div>
                    </div>
                </div>

            </div >
        </>
    );
};

export default ToDo;
