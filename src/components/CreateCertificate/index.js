import React, { useState } from 'react';
import './styles.css'
import axios from 'axios'

const CreateCertificate = () => {

  const onSubmit = (event) => {
    setErrors({})
    event.preventDefault()
    if (!file) {
      return setErrors({ file: 'Por favor inclua um arquivo .pem' })
    }
    else if (!file.name.includes('.pem')) {
      return setErrors({ file: 'Por favor inclua um arquivo .pem' })
    } else if (subject === '') {
      return setErrors({ name: 'O nome não ser vazio' })
    }
    const url = 'https://morning-falls-91705.herokuapp.com/certificates/create/'
    const formData = new FormData();
    formData.append('public_key', file)
    formData.append('subject', subject)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(url, formData, config).then(
      response => {
        let { certificate } = response.data
        certificate = `https://morning-falls-91705.herokuapp.com${certificate}`
        const link = document.createElement('a')
        link.href = certificate
        link.setAttribute('download', 'certificate.pem')
        document.body.appendChild(link)
        link.click()

        window.location.reload()
      }
    )
  }

  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [subject, setSubject] = useState('')

  return (
    <div className="box containers" id='create-certificate-container'>
      <label id='create-cert' className="label">Criar certificado usando chave pública</label>
      <div className="control">
        <form onSubmit={onSubmit}>

          <div className="field">
            <div className="file is-boxed has-name">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" onChange={e => setFile(e.target.files[0])} />
                <span className="file-cta">
                  <span className="file-icon">
                    <img alt='' src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg" />
                  </span>
                  <span className="file-label" id='pem-label'>
                    Clique aqui para fazer o upload de sua chave publica (formato .pem)...
                  </span>
                  {file ? <span className='file-name'> {file.name} </span>: ''}
                </span>
              </label>
              <label className='error-label'>{errors.file ? errors.file : ''}</label>
            </div>
          </div>
          <div className="field-label is-normal" id='name-field'>
            <label className="label">Nome:</label>
          </div>
          <div className="field">
            <p className="control">
              <input className="input" type="name" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Nome do usuário do certificado" />
            </p>
            <label className='error-label'>{errors.name ? errors.name : ''}</label>
          </div>

          <button type="submit" className="button is-primary">Criar certificado</button>
        </form>

      </div>
    </div>
  )
}


export default CreateCertificate;