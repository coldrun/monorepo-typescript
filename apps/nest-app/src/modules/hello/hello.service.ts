import { coerceArray } from '@coldrun/monorepo-typescript-shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello() {
    return { message: coerceArray('Hello World!') };
  }
}
