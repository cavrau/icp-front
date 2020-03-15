import React from 'react';
import './styles.css'
const CreateKey = () => {
  
  const onClick = (event) => {
    event.stopPropagation()
    const url = 'https://morning-falls-91705.herokuapp.com/keys/'
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'keys.zip');
    document.body.appendChild(link);
    link.click();
  
  }
  
  return (
    <div className="box containers" id='create-keys-container'>
        <h3>Gerar Chaves Privada e Publica</h3>
        <button onClick={onClick} className="button is-info">Baixar zip</button>
        <p>
          O zip baixado contém dois arquivos de extensão .pem.<br />
          O public-key.pem contém a chave publica gerada.<br />
          O private-key.pem contém a chave privada.
        </p>
    </div>
  )
}


export default CreateKey;