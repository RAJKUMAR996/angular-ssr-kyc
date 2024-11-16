import { Controller, Get } from '@decorators/express';
@Controller("/health")
export class HealthController {

    @Get("/")
    public async check() {
        return true;
    }
}