import React from 'react'


const Item = ({ reverseWord }) => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-lg-8 inputItem">
                        <input className="form-control" defaultValue={reverseWord} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item