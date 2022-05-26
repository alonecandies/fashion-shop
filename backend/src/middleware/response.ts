import { COMMON_ERROR } from "@src/config/message";
import { Request, Response } from "express";
import logger from "./logger";

/** Returns 404 if no path is found */
const badRequest = (data: any, req: Request, res: Response) => {
    logger.error(`-----------------------BEGIN ERROR-------------------------------`);
    logger.error(`API ERROR: ${req.path}`);
    logger.error(data.message);
    logger.error(`-----------------------END ERROR---------------------------------`);
    res.status(400).send(data);
};

/** Returns success */
const ok = (data: any, req: Request, res: Response) => {
    res.status(200).send(data);
};

const serverError = (data: any, req: Request, res: Response) => {
    logger.error(`-----------------------BEGIN ERROR-------------------------------`);
    logger.error(`API ERROR: ${req.path}`);
    logger.error(data.message);
    logger.error(`-----------------------END ERROR---------------------------------`);
    data.message = COMMON_ERROR.internalServerError;
    res.status(500).send(data);
};

const unAuthorize = (data: any, req: Request, res: Response) => {
    logger.error(`-----------------------BEGIN ERROR-------------------------------`);
    logger.error(`API ERROR: ${req.path}`);
    logger.error(`-----------------------END ERROR---------------------------------`);
    res.status(401).send(data);
};


const forbidden = (data: any, req: Request, res: Response) => {
    logger.error(`-----------------------BEGIN ERROR-------------------------------`);
    logger.error(`API ERROR: ${req.path}`);
    logger.error(data.message);
    logger.error(`-----------------------END ERROR---------------------------------`);
    res.status(403).send(data);
};

const created = (data: any, req: Request, res: Response) => {
    res.status(201).send(data);
};

export { ok, badRequest, serverError, created, forbidden, unAuthorize };
