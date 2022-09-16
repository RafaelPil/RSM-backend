import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  price: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  createdAt?: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  updatedAt?: string;

  @Field(() => Int)
  userId: number;
}
