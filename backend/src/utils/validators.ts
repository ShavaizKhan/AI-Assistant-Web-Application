import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";
// middleware to verify all data (will send back to client if data is incorrect)
// using express-validator package 
export const validate = (validations: ValidationChain[]) => {
    return async (req:Request, res:Response, next: NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }
        res.status(422).json({errors: errors.array()});
    };
};

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min: 8}).withMessage("Password should contain at least 6 characters")
];

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
    ...loginValidator,
];