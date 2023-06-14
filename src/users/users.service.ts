import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongoClient, Db } from 'mongodb';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  private readonly db: Db;
  private readonly usersCollection;

  constructor(private readonly jwtService: JwtService) {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    this.db = client.db('jwtdata');
    this.usersCollection = this.db.collection('users');
  }

  async createUser(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersCollection.insertOne({ username, password: hashedPassword });
    return{Success:"data is inserted"};
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersCollection.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<string> {
    if (!user) {
        throw new Error('Invalid username or password');
      }
    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }
}  
