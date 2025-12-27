import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const controller = app.get(HelloController);
      expect(controller.getHello()).toEqual({ message: ['Hello World!'] });
    });
  });
});
