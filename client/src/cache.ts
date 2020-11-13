import { InMemoryCache, Reference } from '@apollo/client';
import {getAllProducts_products as Product} from './queries/types/getAllProducts'

export interface CartItemInterface {
  product: Product,
  qtd: number
}

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems() {
          return cartItemsVar();
        },
      }
    }
  }
});

export const cartItemsVar = cache.makeVar<CartItemInterface[]>([]);

