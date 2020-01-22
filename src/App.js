import React,{useRef,useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const fileInput= useRef()
  const [fileList,setFileList] = useState([])
  const folderChange = async (e) => {
    e.preventDefault();
    let newFileList = []
    let inputFileList = [...e.target.files]
    console.log(inputFileList.sort((a, b) => {
      const aindex = a.webkitRelativePath.lastIndexOf('/')
      const bindex = b.webkitRelativePath.lastIndexOf('/')
      const apath = a.webkitRelativePath.slice(0, aindex)
      const bpath = b.webkitRelativePath.slice(0, bindex)
      if(apath === bpath){
        const aname = parseInt(a.name.replace(".jpg", "").replace(".png", ""))
        const bname = parseInt(b.name.replace(".jpg", "").replace(".png", ""))
        return aname - bname
      }
      return apath.localeCompare(bpath)
    }))
    for (const i of e.target.files) {
      const image =  URL.createObjectURL(i)
      newFileList.push(image)
    }
    setFileList([...fileList,...newFileList])
  }
  return (
    <div className="App">
      <div>{fileList.length} <input ref={fileInput} type="file" onChange={folderChange} multiple="" directory="" webkitdirectory=""></input></div>
     
      {/* {fileList.map(img => <img src={img} alt="img"/>)} */}
    </div>
  );
}

export default App;
