import React from 'react'
import "./IssueDetailPage.css"

function IssueDetailPage(props) {
    const {detailViewObj,setDetailViewObj} = props;

    let {title,user:{login},created_at,state,body} = detailViewObj;

    const backButtonClickHandler = () => {
        setDetailViewObj(null);
    }

    return (
        <div className="container">
            <p className="backButtonContainer">
                <button className={"backButton"} onClick={backButtonClickHandler}>{`Back`}</button>
            </p>
            <div className="descContainer">
            <div className="tittle">{title}</div>
            <div className="status">{`Status : ${state}  opened on ${created_at}  by ${login}`}</div>
            <div className="body">{body}</div>
            </div>
        </div>
    )
}

export default IssueDetailPage
