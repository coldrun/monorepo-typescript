import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  constructor(private readonly service: HelloService) {}

  @Get()
  getHello() {
    return this.service.getHello();
  }
}
