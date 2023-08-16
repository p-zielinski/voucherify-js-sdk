import { VoucherifyServerSide } from '../src'

describe('Customers API', () => {
	const client = VoucherifyServerSide({
		applicationId: '0498cc6f-ba05-49ee-a557-fa66414ed05c',
		secretKey: '96e3b009-3d32-4720-923d-e96294f16a93',
	})

	it('should create a customer', async () => {
		await client.customers.create({})
	})

	it('should create a customer', async () => {
		await client.customers.create({ source_id: '123' })
	})

	it('should create a customer', async () => {
		await client.customers.create({
			source_id: 'string',
			name: 'string',
			email: 'string@example.com',
			metadata: {
				dsadas: 'string',
			},
			description: 'string',
			address: {
				city: 'string',
				state: 'string',
				line_1: 'string',
				line_2: 'string',
				country: 'string',
				postal_code: 'string',
			},
			phone: '+000321321',
		})
	})
})
