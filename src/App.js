import React from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.css'
import'./App.css'
import FileUpload from './components/FileUpload'
import CreateCertificate from './components/CreateCertificate'
import CreateKey from './components/CreateKey'
import ListCertificates from './components/ListCertificates'
function App() {
  return (
    <div className="App">
      <h1>TESTE LABSEC</h1>
      <div className="box container">
        <FileUpload id='file-upload'></FileUpload>
        <CreateKey id='crete-key'></CreateKey>
        <CreateCertificate id='create-certificate'></CreateCertificate>
        <ListCertificates id='list-certificates'></ListCertificates>
      </div>
    </div>
  );
}

export default App;
