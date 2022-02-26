import React from 'react'
import { Card } from "reactstrap";

export const CheckBox = props => {
    return (
        <Card 
            body 
            inverse 
            style={{
                backgroundColor: '#333',
                borderColor: '#131'
            }}
        >
            <input key={props.id} onClick={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
        </Card>
    )
}

export default CheckBox