import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { fetchData } from '../api/api';



const initialState = {
    title: "",
    description: "",
};

const CreateNote = () => {

    const [state, setState] = useState(initialState);
    const [noteList, setNoteList] = useState([]);
    const { title, description } = state;


    const navigate = useNavigate();


    const fetchNotes = () => {
        fetchData().then(res => {
            console.log(res)
            const notes = res.data
            setNoteList(notes)
        }).catch(err => {
            console.log(err)
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            toast.error("Please fill the all input fields!")
        } else {
            axios.post("http://localhost:5000/api/post", {
                title,
                description,
            }).then(() => {
                setState({ title: "", description: "" });
                fetchNotes(noteList)
            }).catch((err) => toast.error(err.response.data));
            toast.success("Note added successfully")
            setTimeout(() => {
                navigate("/")
            }, 500)
        }
    }



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }




    return (
        <div className='card m-3 ' style={{ minHeight: "600px" }} >
            <div className="card-body">
                <h3>Create Notes</h3>
                <form onSubmit={handleSubmit}>
                    <div className="m-3 ">
                        <input type="text" className="form-control " name='title' id='title' value={title} placeholder='Add Title ...' style={{ background: "#dadbdf" }} onChange={handleInputChange} />
                    </div>

                    <div className="m-3">
                        <textarea type="text" name='description' className="form-control" id='description' value={description} rows="5" placeholder='Write your note ...' style={{ background: "#dadbdf" }} onChange={handleInputChange}></textarea>

                        <button type="submit" className="btn btn-outline-primary mt-2 btn-lg mt-5" onSubmit={handleSubmit}>Create Note</button>
                        <br />
                        <br />
                        <Link to={"/"} className="mt-3">
                            <button type="button" className="btn btn-outline-secondary mt-2 btn-lg" >Go back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div >

    )
}

export default CreateNote;



