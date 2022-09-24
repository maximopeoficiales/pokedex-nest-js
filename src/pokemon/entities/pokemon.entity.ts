import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";


@Schema()
export class Pokemon extends Document {
    @ApiProperty()
    @Prop({
        required: true,
        index: true,
    })
    name: string;
    
    @ApiProperty()
    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);