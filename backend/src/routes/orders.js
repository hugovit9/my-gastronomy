import express from 'express'
import OrdersControllers from '../controllers/orders.js'
import { authenticateJWT } from "../middlewares/auth.js"
import { requireOwner } from "../middlewares/owner.js"
import { Mongo } from "../database/mongo.js"
import { ObjectId } from "mongodb"

const ordersRouter = express.Router()

const ordersControllers = new OrdersControllers

ordersRouter.get('/', async(req, res) =>{
    const { sucess, statusCode, body } = await ordersControllers.getOrders()
    res.status(statusCode).send({sucess, statusCode, body})
})
ordersRouter.get('/userorders/:id', async(req, res) =>{
    const { sucess, statusCode, body } = await ordersControllers.getOrdersByUserId(req.params.id)
    res.status(statusCode).send({sucess, statusCode, body})
})
ordersRouter.post('/', async (req, res) =>{
     const { sucess, statusCode, body } = await ordersControllers.addOrder(req.body)
    res.status(statusCode).send({sucess, statusCode, body})
})

ordersRouter.delete('/:id', async (req, res) =>{
     const { sucess, statusCode, body } = await ordersControllers.deleteOrder(req.params.id)
    res.status(statusCode).send({sucess, statusCode, body})
})

ordersRouter.put('/:id', async (req, res) =>{
     const { sucess, statusCode, body } = await ordersControllers.updateOrder(req.params.id, req.body)
    res.status(statusCode).send({sucess, statusCode, body})
})

    ordersRouter.get('/availables', async(req, res) =>{
    const { sucess, statusCode, body } = await ordersControllers.getAvailableOrders()
    res.status(statusCode).send({sucess, statusCode, body})
})

ordersRouter.get("/owner/orders", authenticateJWT, requireOwner, async (req, res) => {
  try {
    const orders = await Mongo.db.collection("orders")
      .aggregate([
        { $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }},
        { $unwind: "$user" },

        { $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems"
        }},
        { $unwind: { path: "$orderItems", preserveNullAndEmptyArrays: true }},

        { $lookup: {
            from: "plates",
            localField: "orderItems.plateId",
            foreignField: "_id",
            as: "plate"
        }},
        { $addFields: {
            plate: { $arrayElemAt: ["$plate", 0] }
        }},
{
  $group: {
    _id: "$_id",
    pickupStatus: { $first: "$pickupStatus" },
    userEmail: { $first: "$user.email" },
    userName: { $first: "$user.name" },
    items: {
      $push: {
        name: "$plate.name",
        quantity: "$orderItems.quantity"
      }
    },
    totalQuantity: { $sum: "$orderItems.quantity" },
    createdAt: { $first: "$createdAt" }
  }
},
        { $sort: { createdAt: -1 } }
      ])
      .toArray()

    res.json({ sucess: true, body: orders })
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Erro ao buscar pedidos", error })
  }
})
ordersRouter.patch("/:id/status", authenticateJWT, requireOwner, async (req, res) => {
  const { status } = req.body
  const id = req.params.id

  const result = await Mongo.db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    { $set: { pickupStatus: status } }
  )

  if (result.modifiedCount) {
    return res.json({ sucess: true, message: "Status atualizado!" })
  }

  res.status(400).json({ sucess: false, message: "Erro ao atualizar status" })
})



export default ordersRouter