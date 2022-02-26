import { Button, Alert, Card, Input, Form, FormGroup, Label } from "reactstrap";
import { fetchQuery, fetchPost } from '../../utils'
import utilStyles from '../../styles/utils.module.css'
import Select from 'react-select'
import React, { useState } from "react";
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import Layout from "../../components/layout";
import moment from 'moment'
import QueryString from "qs";

const columns = [
    { field: 'batch', headerName: 'Batch ID', width: 140 },
    { field: 'proveedor', headerName: 'Proveedor', width: 200 },
    { field: 'call_time', headerName: 'Time', width: 200 },
    { field: 'channelID', headerName: 'Channel ID', width: 150 },
    { field: 'ani_enviado', headerName: 'ANI Enviado', width: 180 },
    { field: 'ani_recibido', headerName: 'ANI Recibido', width: 180 },
    { field: 'called_number', headerName: 'Called Number', width: 180 },
    { field: 'operador', headerName: 'Operador', width: 200 }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function Busqueda ( {calls} ) {  
  return (
    <>
    <Layout/>
    <div style={{ height: 700, width: '100%' }}>
    <h4 className="title">
        Resultado de <code>Llamadas</code>{'  '}
    </h4>
    <DataGrid rows={calls} columns={columns} components={{Toolbar: CustomToolbar,}}/>
        
      <style jsx>{`

      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 2rem 2rem;
      }

      .grid {
        display: flex;
        max-width: 800px;
        margin-top: 1rem;
      }

      .button {
        width: "100%";
        marginTop: 30;
        padding: "15px 30px";
        backgroundColor: "blue";
        color: "white";
        fontWeight: "bold";
        border: "none";
        cursor: "pointer";
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
    
    let called_numbers = await fetchQuery('called-numbers')
    
    let calls = await fetchQuery('calls?_limit=-1')
    calls.map(obj => {
        let local_time = moment(obj.call_time, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        let str_local_time = local_time.format('YYYY-MM-DD HH:mm:ss')
        let obj_batch = obj.batch
        obj.call_time = str_local_time
        obj.batch = obj_batch.id
        let operador
        called_numbers.map(x => {
          if (x.number == `51${obj.called_number}`)
            operador = x.operador
        });
        obj.operador = operador
    });

    return {
        props: {
          calls
        }
    }
}

export default Busqueda