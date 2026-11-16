import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.NODE_ENV || 'development';
    const envFilePath = path.resolve(process.cwd(), `.env.${env}`);
    const envFileExists = fs.existsSync(envFilePath);

    if (!envFileExists && env !== 'test') {
      throw new Error(`Environment file not found: ${envFilePath}`);
    }

    this.envConfig = envFileExists ? parse(fs.readFileSync(envFilePath)) : {};
  }

  get(key: string): string {
    const value = this.envConfig[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
  }
}
