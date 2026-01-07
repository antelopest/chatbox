import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class CatsController {
  @Get('registaration')
  findAll() {}
}
