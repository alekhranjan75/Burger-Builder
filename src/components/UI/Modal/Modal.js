import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'
const modal = (props) => {
    let mod = null
    if (props.show) {
        mod = <div 
                className = {styles.Modal}
                style = {{
                    transform: 'translateY(0)'}}>
                {props.children}
              </div>
    }
   return (
       <Aux>
           <Backdrop show = {props.show} clicked = {props.cancel}/>
            {mod}
       </Aux>
       
       
   ) 
}
    

export default modal; 