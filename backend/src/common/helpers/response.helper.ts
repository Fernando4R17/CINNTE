import { Request } from 'express';
import { IResponseObject } from '../interfaces/response-object.interface';

function createResponseObject(responseObjectParams: IResponseObject, req: Request) {
    return {
        ...responseObjectParams,
        timestamp: Math.floor(new Date().getTime()),
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
    };
}

export { createResponseObject }; 