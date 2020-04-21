import React, { Component } from 'react'
import Aux from '../Aux'
import Modal from '../../components/UI/Modal/Modal'
const withErrorHandler = (WrapperComponent, axios) => {
    // console.log("withErrorHandler")
    return class extends Component {
        state = {
            error: null
        }
        UNSAFE_componentWillMount() {
            axios.interceptors.request.use((req) => {
                // console.log("interceptors")
                this.setState({error: null})
                return req
            })
            axios.interceptors.response.use(null, err => {
                this.setState({error: err})
                console.log(err.message)
                return Promise.reject(err)
            })
        }
        cancelModal = () => {
            // console.log("invoked cancelModal")
            this.setState({error:null})
        }
        render() {
            let msg = null
            if(this.state.error) {
                msg = this.state.error.message
            }
            return (
            <Aux>
                <Modal show = {this.state.error} cancel = {this.cancelModal}>
                   {msg}
                </Modal>
                < WrapperComponent {...this.props}/>
            </Aux>      
        )
        }
        
    }
}
export default withErrorHandler;