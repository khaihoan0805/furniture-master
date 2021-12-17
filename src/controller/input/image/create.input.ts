import { Request } from "express";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateImageInput extends ICreateInput {
    name: string;
    url: string;
    description?: string;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
}

export class CreateImageInput extends CreateInput<ICreateImageInput> implements ICreateImageInput {
    constructor(req: Request) {
        super(req)
    }

    get name() {
        return this.input.name;
    }

    get url() {
        return this.input.url;
    }

    get description() {
        return this.input.description;
    }   
    
    get createdAt() {
        return new Date();
    }

    get createdBy() {
        return 1;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }
} 