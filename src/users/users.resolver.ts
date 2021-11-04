import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Resolver(of=>User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(returns => User)
  create(@Args('createUserInput') createUserInput: CreateUserInput):Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(returns => [User])
  findAllUser():Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(returns => User)
  findUserById(@Args({name:'id',type:() => Int} ) id: number):Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(returns => User)
  updateUser(
    @Args({name:'id',type:() => Int} ) id:number,
    @Args('userInput') userInput: UpdateUserInput):Promise<User>{
    return this.usersService.update(id, userInput);
  }

  @Mutation(returns => User)
  removeUser(@Args({name:'id',type:() => Int} ) id: number) {
    return this.usersService.remove(id);
    
  }
}
