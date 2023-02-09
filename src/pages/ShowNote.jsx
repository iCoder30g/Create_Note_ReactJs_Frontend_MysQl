import React, { useState, useEffect } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { fetchData } from '../api/api';
import { Link } from 'react-router-dom';

const ShowNote = () => {
    const [noteList, setNoteList] = useState([]);


    const fetchNotes = () => {
        fetchData().then(res => {
            console.log(res)
            const notes = res.data
            setNoteList(notes)
        }).catch(err => {
            console.log(err)
        })
    }



    const deleteCurNote = (id) => {
        if (window.confirm("Delete Note ?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Note deleated successfully!")
            setTimeout(() => fetchNotes(), 500)
        }
    }


    useEffect(() => {
        fetchNotes();
    }, []);


    return (

        <div >

            <Link to={"/createnote"} className="m-5">
                <button className="btn btn-primary d-grid gap-2 col-6 mx-auto" type="button">CREATE NOTE</button>
            </Link>


            <div className='container d-flex justify-content-center mt-5' style={{ minHeight: "480px" }}>
                {noteList === [] ? <h5>No note available !</h5> :
                    noteList.map((item, index) => {
                        return (
                            <div className='card m-2 mb-4 second_headeck ' style={{ width: "18rem", height: "14rem", background: "#dadbdf" }}>
                                <div className="card-body ">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button type="button" className="btn btn-outline-danger btn-sm mt-3" onClick={() => deleteCurNote(item.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}


            </div>
        </div>


    )
}

export default ShowNote