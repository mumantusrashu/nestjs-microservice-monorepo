import { Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ExecuteJobInput {
  @Field()
  @IsNotEmpty()
  name: string;
}
