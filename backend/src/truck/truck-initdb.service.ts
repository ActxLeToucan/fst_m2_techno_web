import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TruckDocument } from './schemas/truck.schema';
import { InitDataConfig } from '../app.types';
import * as Config from 'config';

@Injectable()
export class TruckInitdbService implements OnModuleInit {
    constructor (
        @InjectModel('Truck') private readonly truckModel: Model<TruckDocument>,
    ) {
    }

    async onModuleInit () {
        const config = Config.get<InitDataConfig>('initData');

        if (!config || config.enabled === false) {
            return;
        }

        if (config.enabled === 'ifEmpty') {
            const res = await this.truckModel.countDocuments();
            if (res > 0) {
                return;
            }
        } else {
            await this.truckModel.deleteMany();
        }

        const trucks = [];
        for (let i = 0; i< 15; i++) {
            trucks.push(this.generateRandomTruck());
        }
        try {
            await this.truckModel.create(trucks);
        } catch (error) {
            Logger.error(error);
        }
    }

    private generateRandomTruck () {
        return {
            _id: this.randomPlate(),
            brand: this.randomBrand(),
            model: this.randomLetter() + this.randomNb(999),
            capacity: (this.randomNb(20)+2) + ' m3',
            lastMaintenance: this.dateNullable(),
            year: this.randomNb(20) + 2000,
            status: this.randomStatus()
        }
    }

    private randomPlate(): string {
        return `${this.randomLetter()}${this.randomLetter()}${this.randomNb(9)}${this.randomNb(9)}${this.randomNb(9)}${this.randomLetter()}${this.randomLetter()}${this.randomNb(9)}`;
    }

    private randomLetter(): string {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return letters.charAt(Math.floor(Math.random() * letters.length))
    }

    private randomNb(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private randomBrand(): string {
        const brands = ['Mercedes', 'Iveco', 'Scania', 'Krone', 'DAF', 'Renault', 'Volvo', 'MAN'];
        return brands[Math.floor(Math.random() * brands.length)];
    }

    private randomStatus(): string {
        const status = ['Available', 'Maintenance', 'Used', 'Dead'];
        return status[Math.floor(Math.random() * status.length)];
    }

    private dateNullable(): string | null {
        const nullable = this.randomNb(4);
        return nullable === 0 ? null : new Date().toISOString();
    }
}
