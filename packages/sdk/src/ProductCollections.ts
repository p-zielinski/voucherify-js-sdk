import * as T from './types/ProductCollections'

import type { RequestController } from './RequestController'
import { encode } from './helpers'

export class ProductCollections {
	constructor(private client: RequestController) {}

	/**
	 * @see https://docs.voucherify.io/reference/list-product-collections
	 */
	public list(params?: T.ListProductCollectionsParameters) {
		return this.client.get<T.ListProductCollections>(`/product-collections`, params)
	}

	/**
	 * @see https://docs.voucherify.io/reference/delete-product-collection
	 */
	public delete(productCollectionId?: string) {
		return this.client.delete<{}>(`/product-collections/${encode(productCollectionId)}`)
	}

	/**
	 * @see https://docs.voucherify.io/reference/get-product-collection
	 */
	public get(productCollectionId?: string) {
		return this.client.get<T.ProductCollectionsObject>(`/product-collections/${encode(productCollectionId)}`)
	}
}
