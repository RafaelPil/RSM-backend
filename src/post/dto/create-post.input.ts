import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {

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
  updatedAt: string;

  @Field(() => Int)
  userId: number;
}
