import { Controller, Get } from '@decorators/express';
@Controller("/api/health")
export class HealthController {

    @Get("/")
    public async check() {
        return true;
    }
}