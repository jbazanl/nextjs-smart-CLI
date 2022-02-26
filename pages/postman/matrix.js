import { Button, Alert, Card, Input, Form, FormGroup } from "reactstrap";
import { fetchQuery, fetchPost } from '../../utils'
import utilStyles from '../../styles/utils.module.css'
import Select from 'react-select'
import React, { useState } from "react";
import axios from 'axios';
import Layout from "../../components/layout";
import Link from 'next/link'
import CardActions from '@material-ui/core/CardActions';

export default ({ phones, carriers }) => {  

  const [isChecked, setIsChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(phones.length).fill(false)
  );
  const [listaNumeros, setListaNumeros] = useState('')
  const [response, setResponse] = useState('')

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    let lista = updatedCheckedState.reduce(
      (acumulado, currentState, index) => {
        if (currentState === true) {
          return acumulado + phones[index].id + ",";
        }
        return acumulado;
      },
      ""
    );
    lista = lista.replace(/\,$/, '');
    setListaNumeros(lista);
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    console.log(event.target.name.value)
    console.log(event.target.operador.value)
    //const ruta = event.target.operador.value
    console.log(listaNumeros)
    const objMatrix = new Object()
    objMatrix.nombre = event.target.name.value
    //objMatrix.called_number = [5, 8]
    objMatrix.called_number = listaNumeros.split(',')
    objMatrix.proveedor = event.target.operador.value
    const createResponse = await fetchPost('matrices', null, objMatrix)
    console.log(createResponse)
    event.target.reset()
    window.location.assign ('/postman/matrices');

    //console.log(Object.entries(event.target))
    {/*let response = await axios({
      url: 'https://astvoip.itelvox.com/api/marcar',
      method: "POST",
      data: {numeros: listaNumeros.split(",").map(n=>`${ruta}${n.trim()}`)}
    })
    console.log(response)
    setResponse(response);*/}

  }
  
  return (
    <>
        <Layout/>
        <div className="container">
        <h4 className="title">
          <code>Crear Matrix de llamadas {'  '}<Link href="/postman/matrices">(Lista)</Link></code>
        </h4>
        <div><br /></div>

        <Form onSubmit={handleSubmit}>

        <FormGroup>
          <Input
            id="nameMatrix"
            name="name"
            placeholder="Identifique la matrix"
            type="text"
            required
            valid
          />
        </FormGroup>
        
        <FormGroup>
        <h3>Select proveedor</h3>
        
        {/*<Input id="carrierSelect" name="operador" type="select">
          {carriers.map((carrier) => (
            <option value={carrier.value}>{carrier.label}</option>
          ))}
        </Input>
          */}
        <Select name="operador" options={carriers} />

        {/*<Input id="proveedor" name="proveedor" type="select">
            {carriers.map((carrier) => (
                <option>
                    {carrier.name}
                </option>
            ))}
            </Input> */}
        
        <div><br /></div>
        </FormGroup>
        
        <FormGroup>
        {/*<CheckBox {...destinos}/>*/}
        <h3>Select Called Numbers</h3>
        <div className="grid">
          {phones.map((phone, index) => (
            <Card 
                body 
                outline color="info"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#0336FF',
                    transition: 'color 0.15s ease, border-color 0.15s ease'
                }}
            >
                <Input 
                  type="checkbox"
                  id={`number-checkbox-${index}`}
                  name={phone.number}
                  value={phone.id}
                  checked={checkedState[index]}
                  inline="true"
                  onChange={() => handleOnChange(index)}
                />
                <h3>{phone.number}</h3>
                <p>Operador: {phone.operador}</p>
            </Card>
          ))}
        </div>
        </FormGroup>
        <FormGroup>
        <div className="grid">
        {/*<br /> */}
        &nbsp; <Button block color="primary" outline size="lg">Crear Matrix</Button>
        {/*&nbsp; <Button block name="action" color="secondary" outline size="lg" id="ejecutar">Ejecutar Matrix</Button>*/}
        </div>
        </FormGroup>

        </Form>
 
        {/* &nbsp; <Button color="primary">Hello from nextjs</Button> */}

      <style jsx>{`

               
          .container {
              display: flex;
              min-height: 100vh;
              min-width: 60%;
              max-width: 80%;

              padding: 0 0.5rem;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }

          .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 1rem;
          }

          .description {
              line-height: 1.5;
              font-size: 1.5rem;
          }

          .button {
              width: 100%;
              margin-top: 30px;
              padding: 15px 30px;
              background-color: blue;
              color: white;
              font-weight: bold;
              border: none;
              cursor: pointer;
          }

          .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
              color: #0070f3;
              border-color: #0070f3;
          }

          .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
          }

          .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
          }

          .title {
              margin: 0;
              line-height: 1.15;
              font-size: 3rem;
          }

          .title,
          .description {
              text-align: center;
          }


      `}</style>

    </div>
      </>

  );
};

export async function getServerSideProps() {
    const phones = await fetchQuery('called-numbers')
    const operadores = await fetchQuery('proveedors')
    //console.log(operadores)
    const carriers = operadores.map(x => ({value: x.id, label: x.name}))
    //console.log(carriers)
        
    return {
        props: {
          phones, carriers
        }
    }
}
