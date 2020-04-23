import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { fetchOrder } from '../../store/action/actionOrder'
import { connect } from 'react-redux'

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder()
    }
    render() {
        let order = this.props.order.map(ele =>{
            return <Order 
                key = {ele.id}
                ingredients = {ele.ingredients}
                price = {ele.price}
                />
        })
        if(this.props.loading) {
            order = <Spinner />
        }
        return(
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        order: state.order.order,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: () => dispatch(fetchOrder())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));