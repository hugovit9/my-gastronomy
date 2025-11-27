import PlatesDataAcess from '../dataAcess/plates.js'
import {ok, serverError } from '../helpers/httpResponse.js'

export default class PlatesControllers{
    constructor(){
        this.dataAcess = new PlatesDataAcess()
    }


    async getPlates(){
        try{
            const plates = await this.dataAcess.getPlates()
            return ok(plates)
        } catch(error){
            return serverError(error)
        }
    }
     async getAvailablePlates(){
        try{
            const plates = await this.dataAcess.getAvailablePlates()
            return ok(plates)
        } catch(error){
            return serverError(error)
        }
    }
       
       async addPlate(plateData){
        try{
            const result = await this.dataAcess.addPlate(plateData)
            return ok(result)
        } catch(error){
            return serverError(error)
        }
    } 
    async deletePlate(plateId){
        try{
            const result = await this.dataAcess.deletePlate(plateId)
            return ok(result)
        } catch(error){
            return serverError(error)
        }
    }
          async updatePlate(plateId, plateData){
        try{
            const result = await this.dataAcess.updatePlate(plateId, plateData)
            return ok(result)
        } catch(error){
            return serverError(error)
        }
    }
}

