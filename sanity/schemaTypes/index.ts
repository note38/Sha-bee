import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './product'
import { categorySchema } from './category'
import { homepageSchema } from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, homepageSchema],
}