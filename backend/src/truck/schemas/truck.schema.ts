import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Truck {
    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    _id: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    brand: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    model: string;

    @Prop({
        type: Number,
        required: true,
        default: (): number => new Date().getFullYear(),
    })
    year: number;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    capacity: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        default: 'Available',
    })
    status: string;

    @Prop({
        type: Date,
    })
    lastMaintenance?: string;
}

export type TruckDocument = Truck & Document;

export const TruckSchema = SchemaFactory.createForClass(Truck);
