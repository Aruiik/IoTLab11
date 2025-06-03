import { checkIdParam } from '../middlewares/deviceIdParam.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { config } from 'process';
import Joi from 'joi';
import { IData } from 'modules/models/data.model';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
   public path = '/api/data';
   public router = Router();

   constructor(private dataService: DataService) {
       this.initializeRoutes();
   }

   private initializeRoutes() {
    this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getLatestDeviceData);
    this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
    this.router.delete(`${this.path}/all`, this.cleanAllDevices);    
    this.router.delete(`${this.path}/:id`, checkIdParam, this.cleanDeviceData);
    this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
    this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const allLatest = await this.dataService.getAllNewest();
            response.status(200).json(allLatest);
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };

    private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    };

    // private addData = async (request: Request, response: Response, next: NextFunction) => {
    //     const { air } = request.body;
    //     const { id } = request.params;

    //     // if (!Array.isArray(air) || air.length !== 3) {
    //     //     return response.status(400).json({ error: 'Invalid input data. "air" must be an array of 3 elements.' });
    //     // }

    //     // const missingFields: string[] = [];
    //     // if (!air[0] || typeof air[0].value === 'undefined') missingFields.push('temperature');
    //     // if (!air[1] || typeof air[1].value === 'undefined') missingFields.push('pressure');
    //     // if (!air[2] || typeof air[2].value === 'undefined') missingFields.push('humidity');

    //     // if (missingFields.length > 0) {
    //     //     return response.status(400).json({ error: `Missing or invalid fields: ${missingFields.join(', ')}` });
    //     // }

    //     const data = {
    //         temperature: air[0].value,
    //         pressure: air[1].value,
    //         humidity: air[2].value,
    //         deviceId: Number(id),
    //         readingDate: new Date()
    //     };

    //     try {
    //         await this.dataService.createData(data);
    //         response.status(200).json(data);
    //     } catch (error) {
    //         console.error(`Validation Error: ${error.message}`);
    //         response.status(400).json({ error: 'Invalid input data.' });
    //     }
    // };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {air } = request.body;
        const { id } = request.params;

        const schema = Joi.object({
            air: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().integer().positive().required(),
                        value: Joi.number().positive().required()
                    })
                )
                .unique((a, b) => a.id === b.id),
            deviceId: Joi.number().integer().positive().valid(parseInt(id, 10)).required()
        });

        try {
            const validatedData = await schema.validateAsync({ air, deviceId: parseInt(id, 10) });
            const readingData: IData = {
                temperature: validatedData.air[0].value,
                pressure: validatedData.air[1].value,
                humidity: validatedData.air[2].value,
                deviceId: validatedData.deviceId
            };
            await this.dataService.createData(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private getLatestDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        try {
            const latest = await this.dataService.get(id);
            if (!latest) {
                return response.status(404).json({ message: 'Brak danych dla tego urządzenia.' });
            }
            response.status(200).json(latest);
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };

    private cleanDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        try {
            const result = await this.dataService.deleteData(id);
            response.status(200).json({ message: 'Dane urządzenia usunięte.', result });
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };

    private cleanAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const deviceCount = 17;
            const results = await Promise.all(
                Array.from({ length: deviceCount }, (_, i) => this.dataService.deleteData(i.toString()))
            );
            response.status(200).json({ message: 'Dane wszystkich urządzeń usunięte.', results });
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };
}

export default DataController;