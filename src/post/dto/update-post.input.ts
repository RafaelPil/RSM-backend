import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  price: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  image: string;

  @Field(() => Int)
  userId: number;
}
