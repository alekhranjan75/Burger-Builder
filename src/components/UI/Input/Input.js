import React from 'react'
import styles from './Input.module.css'
const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.Invalid)
    }
    switch (props.inputtype) {
        case 'input':
            inputElement = <input className = {inputStyles.join(' ')} {...props.properties} value = {props.value} onChange = {props.changed}/>
            break;
        case 'textarea':
            inputElement = <textarea className = {inputStyles.join(' ')} {...props.properties} value = {props.value} onChange = {props.changed}/>
            break;
        case 'select':
            inputElement = (
                <select 
                    className = {inputStyles.join(' ')} 
                    {...props.properties} 
                    value = {props.value} 
                    onChange = {props.changed}>
                    {props.properties.options.map(opt => {
                        return <option key = {opt.value}>{opt.displayValue}</option>
                    })}
                </select>
            )
            break;
        default:
            inputElement = <input className = {inputStyles.join(' ')} {...props} />
            break;
    }
    return(
        <div className = {styles.Input}>
            <label className = {styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input;