import './App.css';
import axios from 'axios';
import { useEffect , useState } from "react";
import IssueTiles from './IssueTiles';
import Loading from './Loading';
import IssueDetailPage from './IssueDetailPage';

function App() {
  const [issues, setissues] = useState([]);
  const [detailViewObj, setDetailViewObj] = useState(null)
  const [error, setError] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const setFilterValue = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    async function getIssues(){
      try
      {
        let issuesDetails = await axios.get("https://api.github.com/repos/facebook/react/issues")
        setissues(issuesDetails.data);
      }
      catch(error){
        setError(true)
      }
    }
    getIssues()
  }, [])

  return (
    <div className="App">
      <div className="appInputDiv">
        {issues && !detailViewObj && <input className="appInput" type="text" value={searchValue} onChange={setFilterValue} placeholder="Search any issue"/>}
      </div>
      {
        !error && issues ? !detailViewObj ? issues.map((issue)=>{
          
          let trimmedUpperCaseSearch = searchValue.trim().toUpperCase();
          let {title,number,user:{login},created_at} = issue;

          let isSelected = trimmedUpperCaseSearch === "" || title.toUpperCase().includes(trimmedUpperCaseSearch) ||  number.toString().toUpperCase().includes(trimmedUpperCaseSearch) || login.toUpperCase().includes(trimmedUpperCaseSearch) || created_at.toString().toUpperCase().includes(trimmedUpperCaseSearch) ;

          if(isSelected)
            return(
            <IssueTiles key={issue.id} issue={issue} setDetailViewObj={setDetailViewObj}/>)
          else
              return null
        }) : (
          <IssueDetailPage detailViewObj={detailViewObj} setDetailViewObj={setDetailViewObj}/>
        ) : <Loading />
      }
    </div>
  );
}

export default App;
