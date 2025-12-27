import { coerceArray } from '@coldrun/monorepo-typescript-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: coerceArray('Hello World!') };
  }
}
