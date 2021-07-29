import React from 'react'
import './IssueTiles.css';

function IssueTiles({issue,setDetailViewObj}) {
    let {title,number,user:{login},created_at} = issue;

    const showDetailPage = () => {
        setDetailViewObj(issue)
    }
    
    return (
        <div className="issueTileContainer" onClick={showDetailPage} >
            <div className="title">{title}</div>
            <div>
                <span> #{number}  </span>
                <span>  opened on {created_at}  </span>
                <span>by  {login}  </span>
            </div>
        </div>
    )
}

export default IssueTiles
