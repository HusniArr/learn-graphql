import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsString, MaxLength } from "class-validator";

@InputType()
export class UpdateUserInput {

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
