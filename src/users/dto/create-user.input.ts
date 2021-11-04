import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    username:string;

    @Field()
    @IsString()
    @MaxLength(6)
    password:string;

    @Field()
    isAdmin:boolean
}
