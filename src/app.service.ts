import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    return `Hello World!`;
  }
}
