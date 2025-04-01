import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field()
  name: string;
  @Field()
  description: string;
}
