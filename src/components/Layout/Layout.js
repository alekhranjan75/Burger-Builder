import React from 'react';
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css'
const layout = (props) => (
   <Aux>
       <div >Toolbar, SideDrwawer, Backdrop</div>
       < main className = {styles.main} >
           {props.children}
       </main>
   </Aux>
)

export default layout;