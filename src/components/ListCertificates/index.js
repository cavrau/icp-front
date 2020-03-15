import React, { useState, useEffect } from 'react';
import './styles.css'
import axios from 'axios'
const ListCertificates = () => {
  const [loading, setLoading] = useState(true)
  const [certificates, setCertificates] = useState([])
  const getData = () => {
    setLoading(true)
    const url = 'https://morning-falls-91705.herokuapp.com/certificates/'
    axios.get(url).then(
      response => {
        setCertificates(response.data)
        setLoading(false)
      }
    )
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="box containers" id='list-certificates-container'>
      <div id='generated-certs'>
        <h2>Certificados já gerados</h2>

      </div>
      <div id='certs-list'>

        {
          loading ? (
            <progress className="progress is-small is-primary" id='progress' max="100">15%</progress>
          ) : (
              certificates.map(cert => (
                <div class="card">
                  <div class="card-content">
                    <div class="content" key={cert.id}>
                      <label >Usuário:</label>
                      <label>{cert.subject}</label>
                      <label >Número de serial:</label>
                      <label className='serialNumber'> {cert.serial_number}</label>
                      <div className='buttons'>
                        <button onClick={e => {
                          const link = document.createElement('a')
                          link.href = cert.certificate
                          link.setAttribute('download', 'certificate.pem')
                          document.body.appendChild(link)
                          link.click()
                        }} className='button is-primary'>Certificado</button>
                        <button onClick={e => {
                          const link = document.createElement('a')
                          link.href = cert.subject_public_key
                          link.setAttribute('download', 'certificate.pem')
                          document.body.appendChild(link)
                          link.click()
                        }} className='button is-warning'>Chave publica</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
        }
      </div>
    </div>
  )
}


export default ListCertificates;