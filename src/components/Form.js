import React, { useState } from 'react'
import Item from './Item'


const Form = () => {
    const [message, setMessage] = useState("");
    const [reverseWord, setReverseWord] = useState({reverseWord: ""})
    const [reverseWords, setReverseWords] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = e => {
        setReverseWord({ [e.target.name]: e.target.value })
    }

    const handleClick = e => {
        if (Object.keys(reverseWord).length === 0 || reverseWord.reverseWord.trim() === '') {
            setMessage("Input text cannot be empty");
            return
        }

        const apiUrl = "http://localhost:6202/iecho?text=" + reverseWord.reverseWord.trim();

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data.text);
                setMessage("Reverse text: " + data.text);
                reverseWord.reverseWord = data.text;
                setReverseWords([...reverseWords, reverseWord])
                setReverseWord({ reverseWord: "" });
            });

    }

    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-light navbarStyle">
                <form className="form-inline my-1 " onSubmit={e => e.preventDefault()}>
                    <input className="form-control mr-sm-2" type="text" name="reverseWord" onChange={handleChange} value={reverseWord.reverseWord} placeholder="Input text" aria-label="Search" />
                    <button className="btn btn-blue my-2 my-sm-0" id="sendButton" data-toggle="modal" data-target="#messageModal" onClick={handleClick}>Send</button>
                </form>
            </nav>
            <div className="App-content">
                <div className="container overflow-auto listContainer">
                    <div>
                        <p className="headerText">Results: </p>
                    </div>
                    {
                        reverseWords.map((value, index) => (
                            <Item reverseWord={value.reverseWord} key={index} />
                        ))
                    }
                </div>
            </div>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
</button>


            <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reverse word list</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{message}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Form