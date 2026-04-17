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

  async function mockUpload(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    setLoading(true);
    console.log(file);

    const formData = new FormData();

    // append file
    formData.append("file", file);

    // call API
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(data);

    setLoading(false);
  }

  // append files
  return (
    <>
      {loading ? <Loader /> : <input type="file" onChange={mockUpload} />}
      {response && <p>{response.message}</p>}
    </>
  );
};

export default UploadFile;
