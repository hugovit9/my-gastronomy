import OrdersDataAcess from '../dataAcess/orders.js'
import {ok, serverError } from '../helpers/httpResponse.js'

export default class OrdersControllers{
    constructor(){
        this.dataAcess = new OrdersDataAcess()
    }


    async getOrders(){
        try{
            const orders = await this.dataAcess.getOrders()
            return ok(orders)
        } catch(error){
            return serverError(error)
        }
    }
        async getOrdersByUserId(userId){
        try{
            const orders = await this.dataAcess.getOrdersByUserId(userId)
            return ok(orders)
        } catch(error){
            return serverError(error)
        }
    }

     async getAvailableOrders(){
        try{
            const orders = await this.dataAcess.getAvailableOrders()
            return ok(orders)
        } catch(error){
            return serverError(error)
        }
    }
       
       async addOrder(orderData){
        try{
            const result = await this.dataAcess.addOrder(orderData)
            return ok(result)
        } catch(error){
            return serverError(error)
        }
    } 
    async deleteOrder(orderId){
        try{
            const result = await this.dataAcess.deleteOrder(orderId)
            return ok(result)
        } catch(error){
            return serverError(error)
        }
    }
          async updateOrder(orderId, orderData){
        try{
            const result = await this.dataAcess.updateOrder(orderId, orderData)
            return ok(result)
        } catch(error){
            return serverError(error)
        }
    }
}

