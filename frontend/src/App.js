
import {useState} from "react"



function FileUploadMultiple() {
  const [fileList, setFileList] = useState(null);
  const [url, setUrl] = useState(null); 

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleClick = (e) => {
    fetch('http://localhost:8080/all-images')
  .then((response) => response.json())
  .then((data) => setUrl(data));
  }

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`picture`, file, file.name);
    });

    fetch('http://localhost:8080/image', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
 
  const files = fileList ? [...fileList] : [];

 
  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>

      <button onClick={handleUploadClick}>Upload</button>
      <button onClick={handleClick}>get</button>

      <div>
        {
          url?.map((image, index) => {
            return (
              <img src={image} alt="" key={index}/>
            )
          })
        }
      </div>
    </div>
  );
}

export default FileUploadMultiple;