import React, { useEffect, useState } from "react";
import axios from "axios";
const ToDo = () => {
    const [inputValue, setInputvalue] = useState("");
    const [list, setList] = useState([]);
    const [isUpdate, setIsUpdate] = useState("");
    const [updateValue, setUpdateValue] = useState("");
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await axios.get("http://localhost:5000/toDo")
                setList(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getItems()
    }, [list])

    const addItem = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:5000/save", { inputValue: inputValue });
            console.log(inputValue);
            setList([...list, res.data]);
            setInputvalue("");

        } catch (e) {
            console.log(e);
        }
    }


    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/todo/delete/${id}`);
            console.log(res);
            const newList = list.filter((e) => e._id !== id);
            setList(newList);
            console.log(newList);
        } catch (error) {

        }
    }



    const update = (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:5000/todo/update/${isUpdate}`, { text: updateValue });
            setIsUpdate("");
            setUpdateValue("");
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAll = async () => {
        try {

            await axios.delete("http://localhost:5000/todo/deleteAll");
            setList([]);
        } catch (error) {
            console.log(error);
        }
    }

    const updateForm = () => {
        return (<>
            <div className="container-fluid ">
                <form onSubmit={(e) => update(e)} >
                    <table className="table-borderless ">
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" onChange={(e) => setUpdateValue(e.target.value)} value={updateValue}></input>
                                </td>
                                <td>
                                    <button type="submit" className="btn btn-secondary ">Update</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        </>);
    }

    return (
        <>
            <div className="container-fluid bg-primary-subtle">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-6">
                        <form onSubmit={addItem}>

                            <input type="text" name="todo" id="todo" value={inputValue}
                                onChange={(e) =>
                                    setInputvalue(e.target.value)
                                }
                            ></input>
                            <button type="submit" className="btn btn-primary m-3" >Add</button>

                        </form>
                        <div>
                            {
                                list.length === 0 ? <h3>No record</h3>

                                    : list.map((p) => {
                                        return (
                                            <div key={p._id}>
                                                {/* <h4 >
                                                    {p.text}
                                                    <button className="btn btn-success" onClick={() => deleteItem(p._id)}>Done</button>
                                                    <button className="btn btn-dark">Update</button>
                                                </h4> */}
                                                {isUpdate === p._id
                                                    ? updateForm() :

                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-5 m-2 ">
                                                                <h4>{p.text}</h4>
                                                            </div>
                                                            <div className="col-md-2 m-2 ">
                                                                <button className="btn btn-success" onClick={() => deleteItem(p._id)}>
                                                                    Done
                                                                </button>
                                                            </div>
                                                            <div className="col-md-2 m-2">
                                                                <button className="btn btn-dark" onClick={() => setIsUpdate(p._id)}>Update</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                }


                                            </div>
                                        )
                                    })}
                        </div>
                        <div>
                            {list.length === 0 ? <p></p> :
                                <button className="btn btn-danger m-2" onClick={deleteAll}>Reset</button>
                            }

                        </div>
                    </div>
                </div>

            </div >
        </>
    );
};

export default ToDo;
