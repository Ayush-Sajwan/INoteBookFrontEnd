import React from 'react'

export default function Alerts(props) {
    return (
        <div >
            <div className={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.msg}
            </div>
        </div>
    )
}
