import { Button, Alert, Card, Input, Form, FormGroup, Label } from "reactstrap";
import { fetchQuery, fetchPost } from '../../utils'
import utilStyles from '../../styles/utils.module.css'
import Select from 'react-select'
import React, { useState } from "react";
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import Layout from "../../components/layout";
import Loader from "../../components/Loader";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DateTime } from "luxon";
import moment from 'moment'


const columns = [
    { field: 'proveedor', headerName: 'Proveedor', width: 250 },
    { field: 'time', headerName: 'Time', width: 300 },
    { field: 'ani_enviado', headerName: 'ANI Enviado', width: 250 },
    { field: 'ani_recibido', headerName: 'ANI Recibido', width: 250 },
    { field: 'called_number', headerName: 'Called Number', width: 250 }
];

const CustomColorCheckbox = withStyles({
  root: {
    color: "#13c552",
    "&$checked": {
      color: "#13c552"
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

function Execute ( {matrices} ) {  

    const [matrix, setMatrix] = useState('')
    const [response, setResponse] = useState('')
    const [display, setDisplay] = useState(false)
    const [rows, setRows] = useState({});
    const [prefix, setPrefix] = useState('')
    const [inputARI, setInputARI] = useState([])
    const [checked, setChecked] = useState(false);
    const [scheduled, setScheduled] = useState(true);    
    const [disabled, setDisabled] = useState(true);    
    const [taskID, setTaskID] = useState(0);    
    const [viewTask, setViewTask] = useState(false)

    const listMatrices = matrices.map(x => ({value: x.id, label: x.nombre}))
    const [loading, setLoading] = useState(false)

    /*useEffect(() => {
        let url = 'https://astvoip.itelvox.com/api/marcar';
        if(inputARI.length > 0){
            fetchNewData(url, inputARI);
        } else {
            console.log(inputARI)
        }
    }, [inputARI]); */

    const handleChange = (event) => {
      setChecked(event.target.checked);
      if (event.target.checked) {
        //setScheduled(true)
        setDisabled(false)
      } else {
        //setScheduled(false)
        setDisabled(true)
      }
    };
    
    const fetchAsteriskARI = async (proveedor, prefix, callerNumber, inputARI, batchID) => {
        console.log('fetchAsteriskARI')
        console.log(inputARI)
        const proveedor_name = proveedor
        const url = 'https://astvoip.itelvox.com/api/marcar'
        let configAxios = {
            method: 'POST',
            url: url,
            data:{numeros: inputARI.map(n=>`${prefix}${n.number}`), caller_number: callerNumber},
        };
        setLoading(true)
        const response = await axios(configAxios)
        console.log('ARI executed')
        const results = await response.data.json_data
        console.log('results call ARI')
        console.log(results)
        //Procesar data aqui/
        const jsonObj = [];
        //Object Call
        Object.entries(results).forEach((entry) => {
            const [key, value] = entry;
            console.log(`${key}: ${value.StasisStart.ChannelID}`);
            const item = {}
            item ["id"] = value.StasisStart.ChannelID;
            item ["proveedor"] = proveedor;
            item ["time"] = value.StasisStart.CreationTime;
            item ["ani_enviado"] = callerNumber;
            item ["ani_recibido"] = value.StasisStart.CallerNumber;
            item ["called_number"] = key;
            //Insert each call data to Strapi
            const callObj = {}
            callObj ["batch"] = batchID;
            callObj ["channelID"] = value.StasisStart.ChannelID;
            callObj ["proveedor"] = proveedor_name;
            callObj ["call_time"] = value.StasisStart.CreationTime;
            callObj ["ani_enviado"] = callerNumber;
            callObj ["ani_recibido"] = value.StasisStart.CallerNumber;
            callObj ["called_number"] = key;
            
            jsonObj.push(item);
            const insertCall = fetchPost('calls', null, callObj)
            console.log(insertCall)
    
        });
        setRows(jsonObj)
        setLoading(false)
    };


    let handleSubmit = async(event) => {
        event.preventDefault() // don't redirect the page
        console.log(event.target.date.value)
        console.log(event.target.time.value)
        console.log(event.target.matrix.value)
        if (!event.target.matrix.value) {
          alert('Seleccionar Matrix');
          return false;
        } 
        if (!disabled && !event.target.date.value) {
            alert('Seleccionar fecha');
            return false;
        } 
        if (!disabled && !event.target.time.value) {
            alert('Seleccionar hora');
            return false;
        }
        if (viewTask == true)
          setViewTask(false)
        if (display == true)
          setDisplay(false)
        console.log("handleSubmit")
        const id_matrix = event.target.matrix.value
        //Get valores de la matrix
        const objMatrix = await fetchQuery(`matrices/${id_matrix}`)
        await console.log(objMatrix)
        await console.log(objMatrix.proveedor.prefix)
        const proveedor = objMatrix.proveedor.name
        const prefix = objMatrix.proveedor.prefix
        const callerNumber = objMatrix.proveedor.callerNumber
        console.log('callerNumber: ' + callerNumber);
        //setPrefix(prefix)
        await console.log(objMatrix.called_number)
        const objNumeros = objMatrix.called_number
        objNumeros.forEach((item) => {
            console.log('ID: ' + item.number);
        });
        //Get local time
        let dateTime = DateTime.local()
        let local_time = dateTime.toISO()
        console.log(local_time)
        //Registrando Batch en Strapi
        const objBatch = new Object()
        objBatch.matrix = id_matrix
        if (disabled) {
          objBatch.tipo = 'Inmediato'      
          objBatch.scheduled_time = local_time
          objBatch.trigger_time = local_time
          objBatch.estado_actual = 'Ejecutado'
        }
        else {
          objBatch.tipo = 'Diferido'
          let str_local_time = event.target.date.value + ' ' + event.target.time.value
          const myDate = moment(str_local_time, 'YYYY-MM-DD HH:mm:ss')
          let dateStr= myDate.format('YYYY-MM-DD HH:mm:ssZ')
          objBatch.scheduled_time = dateStr
        }
        console.log(objBatch.scheduled_time)
        objBatch.estado_actual = 'Pendiente'
        const createResponse = await fetchPost('batches', null, objBatch)
        let batchID = createResponse.id
        console.log("batchID: " + batchID)
        setTaskID(batchID)
        setViewTask(true)
        //Call Asterisk ARI
        if (disabled) {
          console.log("Call API Rest")
          await fetchAsteriskARI(proveedor, prefix, callerNumber, objNumeros, batchID);
          setDisplay(true)
        }
    }
  
  return (
    <>
        <Layout/>
        <div style={{ height: 700, width: '100%' }}>
        
        { viewTask && disabled && <Alert color="primary">
          Se ejecutó la tarea con ID {taskID}
        </Alert> }
        
        { viewTask && !disabled && <Alert color="primary">
          Se programó la tarea con ID {taskID}
        </Alert> }
        
        <main style={{ height: 450, width: '70%' }}>
        
        <Form  onSubmit={handleSubmit}>

        <FormGroup>
        <h3>Select matrix: </h3>
        <Select id="matrix" name="matrix" options={listMatrices} />
        </FormGroup>
        
        <FormControlLabel
          control={<CustomColorCheckbox checked={checked} onChange={handleChange} />}
          label="Programar ejecución"
        />

        {scheduled &&
        <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input disabled={disabled} type="date" name="date" id="exampleDate" placeholder="date placeholder" />
        </FormGroup>
        }
        {scheduled &&
        <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input disabled={disabled} type="time" name="time" id="exampleTime" placeholder="time placeholder" />
        </FormGroup>
        }
        <FormGroup>
        {/*<br /> */}
        &nbsp; <Button block color="primary" outline size="lg">Ejecutar</Button>
        </FormGroup>
        </Form>
        </main>

        <main style={{ height: 700, width: '100%' }}>
        
        {loading && <Loader />}

        {/* display && <CallTable rows={rows} /> */}
        { display && <DataGrid rows={rows} columns={columns} /> }
        </main>
        {/* &nbsp; <Button color="primary">Hello from nextjs</Button> */}
        
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
    const matrices = await fetchQuery('matrices')
    console.log(matrices)
    //const matrices = res.map(x => ({value: x.id, label: x.nombre}))
           
    return {
        props: {
          matrices
        }
    }
}

export default Execute