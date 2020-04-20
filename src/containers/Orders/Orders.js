import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            // console.log(res.data)
            const fetchedData = []
            for(let key in res.data) {
                fetchedData.push ({
                    ...res.data[key],
                    id: key
                })
            }
            // console.log(fetchedData[0].ingredients)
            this.setState({loading: false, orders: fetchedData})
        })
        .catch(res => {
            this.setState({loading: false})
        });
    }
    render() {
        let order = this.state.orders.map(ele =>{
            return <Order 
                key = {ele.id}
                ingredients = {ele.ingredients}
                price = {ele.price}
                />
        })
        if(this.state.loading) {
            order = <Spinner />
        }
        return(
            <div>
                {order}
                {/* <Order/> */}
            </div>
        )
    }
}
export default withErrorHandler(Orders, axios);