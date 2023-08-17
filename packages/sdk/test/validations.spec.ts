import { voucherifyClient as client } from './client'
// import { generateRandomString } from './utils/generateRandomString'

describe('Validations API', () => {
	const generateVoucher = async () =>
		await client.vouchers.createWithoutCode({
			type: 'DISCOUNT_VOUCHER',
			discount: {
				amount_off: 2000,
				type: 'AMOUNT',
			},
			redemption: {
				quantity: 1,
			},
			metadata: {},
		})

	it('should validate', async () => {
		const response = await client.validations.validateVoucher((await generateVoucher()).code)
		if (
			!response.valid ||
			!response.applicable_to ||
			!response.inapplicable_to ||
			!response.code ||
			!response.metadata
		) {
			throw new Error('All values should be positive')
		}
	})

	it('should validate', async () => {
		const response = await client.validations.validate((await generateVoucher()).code)
		if (
			!response.valid ||
			!response.applicable_to ||
			!response.inapplicable_to ||
			!response.code ||
			!response.metadata
		) {
			throw new Error('All values should be positive')
		}
	})
	// const allCustomers = []
	// //client.customers.scroll ---- does not work
	// it('should scroll through all customers', async () => {
	// 	const response = await client.customers.list({ limit: 1 })
	// 	const { total } = response
	// 	for await (const customer of client.customers.scroll({ limit: 5 })) {
	// 		allCustomers.push(customer)
	// 	}
	// 	console.log(total, allCustomers.length)
	// 	if (total !== allCustomers.length) {
	// 		throw new Error(`Scroll got incorrect number of customers`)
	// 	}
	// })
})
