import { fetchQuery } from '../../utils'
import { DataGrid } from '@material-ui/data-grid';
import Layout from "../../components/layout";
import React, { useState } from "react";
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'

const columns = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'nombre', headerName: 'Nombre', width: 250 },
    { field: 'proveedor', headerName: 'Proveedor', width: 200 },
    { field: 'called_number', headerName: 'Called Numbers', width: 800 }
];

function getNumbers(path, params = null, body) {
    let url
}

function Matrices ( {data} ) {  

    const [rows, setRows] = useState({});
    const lista = data.map(x => ({id: x.id, nombre: x.nombre, proveedor: x.proveedor.name, called_number: x.called_number.map(x => (  x.number )) }))
  
  return (
    <>
        <Layout/>
        <div className="container">
        <h4 className="title">
        Relación de <code>Matrices</code>{'  '} <Link href="/postman/matrix">(Add)</Link>
        </h4>
        <br></br>
        <main style={{ height: 700, width: '100%' }}>
        <DataGrid rows={lista} columns={columns} />
        </main>

        <style jsx>{`

        .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
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
        margin-top: 3rem;
        }

        .title {
        margin: 0;
        line-height: 1.15;
        font-size: 2rem;
        }

        .title,
        .description {
        text-align: center;
        }

        a {
            background-color: #B00020;
            color: #fff;
            padding: 1rem;
            text-decoration: none;
        }
  
        `}</style>


        </div>
    </>

  );
};

export async function getServerSideProps() {
    const data = await fetchQuery('matrices')
    console.log(data)
    //const matrices = res.map(x => ({value: x.id, label: x.nombre}))
           
    return {
        props: {
          data
        }
    }
}

export default Matrices