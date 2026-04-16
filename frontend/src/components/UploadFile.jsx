import { useState } from "react";
import Loader from "./Loader";

/*
1. get file
2. store file in state
3. start upload (loading = true)
4. wait 2–3 seconds (simulate server)
5. decide success / failure
6. store response
7. stop loading
*/

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  function mockUpload(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    setLoading(true);
    console.log(file);

    // simulate API delay
    setTimeout(() => {
      setResponse({
        status: "success",
        message: "Document verified",
        score: Math.floor(70 + Math.random() * 25),
      });
      setLoading(false);
      console.log(response);
    }, 2000);
  }
  return (
    <>{loading ? <Loader /> : <input type="file" onChange={mockUpload} />}</>
  );
};

export default UploadFile;
