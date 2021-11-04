import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository : Repository<User>){}

  async create(createUserInput: CreateUserInput):Promise<User> {
      const newuser =  this.userRepository.create(createUserInput);
      return this.userRepository.save(newuser);
  }

  async findAll():Promise<User[]> {
    // const user = new User();
    // user.username = "husni";
    // user.password = "12345";
    // user.isAdmin = true;
    const user = this.userRepository.find();
    return user;
  }

  async findOne(id:number):Promise<User>{
    const user = await this.userRepository.findOne(id);
    return user;
  }



 async update(id: number, updateUserInput: UpdateUserInput):Promise<User>{
   const result =  await this.userRepository.update(id,{...updateUserInput});
    const user = await this.userRepository.findOne(id);
    return {
      ...user,
      ...updateUserInput
    }
    
  }

  async remove(id: number):Promise<User>{
    const user = await this.userRepository.findOne(id)
    await this.userRepository.remove(user);
    return {
      id:id,
      username:'',
      password:'',
      isAdmin:false
    };
  }
}
