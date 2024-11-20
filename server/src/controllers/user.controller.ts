import { User } from "db/types/user.type";
import { UserSchemaModel } from "../../db/models/user.model";
import { Controller, Get, Post, Request, Res } from '@decorators/express';
import { Response, Request as Req } from "express";
import { genSalt, hash } from "bcrypt";
@Controller("/api/users")
export class UserController {
    constructor() {

    }

    /**
     * Method to get all Users
     * @returns @type {User}
     */
    @Get("/")
    async get() {
        var dd = await UserSchemaModel.find({}).lean();
        return dd;
    }

    @Post("/asdoctor")
    async doctor() {
        var dd = await UserSchemaModel.find({}).lean();
        return dd;
    }

    @Post("/aspatient")
    async patient(@Request() req: Req, @Res() res: Response) {
        try {
            const reqBody: any = req.body || {};
            var user = {} as User;
            user.username = reqBody.username;
            user.isActive = true;
            user.createdDate = new Date();
            const salt = await genSalt(10);
            user.passwordHash = await hash(reqBody.password || 'Demo@123', salt);
            user.email = reqBody.email;
            user.mobile = reqBody.mobile;
            var userModel = await UserSchemaModel.create(user);
            console.log("send response")
            return userModel;
        } catch (error) {
            console.log("error", error);
            res.sendStatus(500);
        }
    }
}