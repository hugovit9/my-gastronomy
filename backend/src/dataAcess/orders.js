import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'orders'

export default class OrdersDataAccess {
  async addOrder(orderData) {
    const { items, ...orderDataRest } = orderData;
    
    orderDataRest.createdAt = new Date();
    orderDataRest.pickupStatus = "Pending";
    
    try {
      orderDataRest.userId = new ObjectId(orderDataRest.userId);
    } catch (error) {
      throw new Error("Invalid userId format: must be a valid ObjectId.");
    }
    
    const newOrder = await Mongo.db
      .collection(collectionName)
      .insertOne(orderDataRest);

    if (!newOrder.insertedId) {
      throw new Error("Order cannot be inserted");
    }

    const orderId = newOrder.insertedId;

    const itemsToInsert = items.map((item) => {
      const plateIdString = item.plateId || item.plateid;

      try {
        return {
          quantity: item.quantity,
          plateId: new ObjectId(plateIdString), 
          orderId: orderId
        };
      } catch (error) {
        throw new Error(`Invalid plateId format for item: ${plateIdString}`);
      }
    });

    const result = await Mongo.db
      .collection("orderItems")
      .insertMany(itemsToInsert);

    return result;
  }



async getOrders() {
  const result = await Mongo.db
    .collection(collectionName)
    .aggregate([
      {
        $lookup: {
          from: 'orderItems',
          localField: '_id',
          foreignField: 'orderId',
          as: 'orderItems'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          'userDetails.password': 0,
          'userDetails.salt': 0,
        }
      },


      {
        $unwind: {
          path: '$orderItems',
          preserveNullAndEmptyArrays: true
        }
      },

    
      {
        $lookup: {
          from: 'plates',
          localField: 'orderItems.plateId',
          foreignField: '_id',
          as: 'orderItems.itemDetails'
        }
      },


      {
        $addFields: {
          'orderItems.itemDetails': {
            $arrayElemAt: ['$orderItems.itemDetails', 0]
          }
        }
      },


      {
        $group: {
          _id: '$_id',
          userId: { $first: "$userId" },
          userDetails: { $first: '$userDetails' },
          orderItems: { $push: '$orderItems' },
          pickupStatus: { $first: "$pickupStatus" },
          pickupTime: { $first: '$pickupTime' },
          createdAt: { $first: '$createdAt' }
        }
      }
    ])
    .toArray();

  return result;
}

async getOrdersByUserId(userId) {
  const result = await Mongo.db
    .collection(collectionName)
    .aggregate([

      {
        $match: { userId: new ObjectId(userId) }
      },

      {
        $lookup: {
          from: 'orderItems',
          localField: '_id',
          foreignField: 'orderId',
          as: 'orderItems'
        }
      },


      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $project: {
          'userDetails.password': 0,
          'userDetails.salt': 0,
        }
      },


      {
        $unwind: {
          path: '$orderItems',
          preserveNullAndEmptyArrays: false
        }
      },


      {
        $lookup: {
          from: 'plates',
          localField: 'orderItems.plateId',
          foreignField: '_id',
          as: 'orderItems.itemDetails'
        }
      },


      {
        $addFields: {
          'orderItems.itemDetails': {
            $arrayElemAt: ['$orderItems.itemDetails', 0]
          }
        }
      },


      {
        $group: {
          _id: '$_id',
          userId: { $first: "$userId" },
          userDetails: { $first: '$userDetails' },
          orderItems: { $push: '$orderItems' },
          pickupStatus: { $first: "$pickupStatus" },
          pickupTime: { $first: '$pickupTime' },
          createdAt: { $first: '$createdAt' }
        }
      },

      {
        $sort: { createdAt: -1 }
      }
    ])
    .toArray();

  return result;
}


  async deleteOrder(orderId) {
    const orderObjectId = new ObjectId(orderId);

    const itemsToDelete = await Mongo.db
      .collection('orderItems')
      .deleteMany({ orderId: orderObjectId })

    const orderToDelete = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: orderObjectId })

    const result = {
      itemsDeletedCount: itemsToDelete.deletedCount, 
      orderDeleted: orderToDelete.value
    }

    return result
  }



  async updateOrder(orderId, orderData) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        { $set: orderData },
        { returnDocument: 'after' }
      )

    return result
  }
}