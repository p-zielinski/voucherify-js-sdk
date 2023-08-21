import { voucherifyClient as client } from './client'
import { OrdersCreateResponse } from '@voucherify/sdk'
//
describe('Orders API', () => {
	let order: OrdersCreateResponse
	let orderExpectToEqualObject: any

	it('should create orders', async () => {
		order = await client.orders.create({
			customer: {
				source_id: '123123',
			},
			status: 'PAID',
			items: [
				{
					product_id: 'prod_090cafbb84d3a81ce3',
					quantity: 1,
					price: 1000,
					product: {
						metadata: {
							category: 'a',
						},
					},
				},
				{
					product_id: 'prod_092f74cb134164e32b',
					quantity: 1,
					price: 1000,
					product: {
						metadata: {
							category: 'b',
						},
					},
				},
			],
		})
		orderExpectToEqualObject = {
			id: expect.stringMatching(/^ord_.*/),
			source_id: null,
			created_at: expect.stringMatching(/.*/),
			updated_at: null,
			status: 'PAID',
			amount: 2000,
			total_amount: 2000,
			items: [
				{
					object: 'order_item',
					product_id: 'prod_090cafbb84d3a81ce3',
					quantity: 1,
					amount: 1000,
					price: 1000,
					subtotal_amount: 1000,
					product: { metadata: { category: 'a' } },
				},
				{
					object: 'order_item',
					product_id: 'prod_092f74cb134164e32b',
					quantity: 1,
					amount: 1000,
					price: 1000,
					subtotal_amount: 1000,
					product: { metadata: { category: 'b' } },
				},
			],
			customer: { id: 'cust_sasCvOmyfP9JOKtFt0pAqHnO', object: 'customer' },
			customer_id: 'cust_sasCvOmyfP9JOKtFt0pAqHnO',
			referrer_id: null,
			object: 'order',
		}

		expect(order).toEqual(orderExpectToEqualObject)
	})

	it('should create orders', async () => {
		order = await client.orders.get(order.id)
		expect(order).toEqual(orderExpectToEqualObject)
	})
})
