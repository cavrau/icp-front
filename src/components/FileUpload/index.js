import React, {useState} from 'react';
import axios from 'axios'
import { Container, Notification } from 'react-bulma-components'
import './styles.css'

const FileUpload = () => {
  const [sha, setSha] = useState(null);
  const [file, setFile] = useState(null);
  const [sent, setSent] = useState(false);
  
  const onChange = (event) => {
    setSha(null)
    setSent(true)
    const { files } = event.target
    event.stopPropagation()
    const url = 'https://morning-falls-91705.herokuapp.com/files/'
    const formData = new FormData();
    setFile(files[0])
    formData.append('archive', files[0])
    formData.append('sha_256', '')
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(url, formData, config).then(
      response => {
        setSent(false)
        setSha(response.data.sha_256)
      }
    )
  
  }
  
  return (
    <div className="box containers" id='file-upload-container'>
      <label className="label">Resumo criptográfico de um Arquivo</label>
      <div className="control">
        <div className="field">
          <div className="file is-boxed has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" onChange={onChange} />
              <span className="file-cta">
                <span className="file-icon">
                  <img src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg" />
                </span>
                <span className="file-label">
                  Clique aqui para fazer o upload...
              </span>

              {file ? <span className='file-name'> {file.name} </span>: ''}
              </span>
            </label>
            {
              sent ? <progress className="progress is-small is-primary" id='progress' max="100">15%</progress> : ''
            }
            {
              sha ? <div className='sha'><strong>Resumo Criptográfico:</strong> <p>{sha}</p></div> : ''
            }
          </div>
        </div>

      </div>
    </div>
  )
}


export default FileUpload;