import { Injectable } from '@nestjs/common';
import { BinaryLike, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class HashService {
  private genSalt(byteSize: number): string {
    return randomBytes(byteSize).toString('hex');
  }

  private async genHashWithScript(
    password: string,
    salt: string,
  ): Promise<string> {
    const keylen = 32;
    const asyncScript = promisify(scrypt) as unknown as (
      password: BinaryLike,
      salt: BinaryLike,
      keylen: number,
    ) => Promise<Buffer>;
    return (await asyncScript(password, salt, keylen)).toString('hex');
  }

  async hash(password: string): Promise<string> {
    const salt = this.genSalt(16);
    const hash = await this.genHashWithScript(password, salt);
    return `${salt}.${hash}`;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const [salt, storedHash] = hash.split('.');
    const computedHash = await this.genHashWithScript(password, salt);
    return computedHash === storedHash;
  }
}
