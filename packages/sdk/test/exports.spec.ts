import { voucherifyClient as client } from './client'
import { expectTimeIsoString } from './utils/expectTimeIsoString'
import { ExportsCreateVoucher } from '@voucherify/sdk'

describe('Exports API', () => {
	it('Should create export, with no parameters', async () => {
		const result = await client.distributions.exports.create({ exported_object: 'voucher' })
		expect(result).toMatchObject({
			id: expect.stringMatching(/^exp-*/),
			object: 'export',
			created_at: expectTimeIsoString,
			status: 'SCHEDULED',
			channel: 'API',
			exported_object: 'voucher',
			parameters: {},
			result: null,
			user_id: null,
		})
	})

	it('Should create export, with some parameters', async () => {
		const result = await client.distributions.exports.create({
			exported_object: 'voucher',
			parameters: {
				fields: ['id', 'code', 'voucher_type', 'value', 'discount_type'],
				filters: { code: { conditions: { $is_unknown: [true] } } },
			},
		} as ExportsCreateVoucher)
		console.log(result)
		// expect(result.id).toEqual(expect.stringMatching(/^exp-*/))
		// expect(result.object).toEqual('export')

		expect(result).toMatchObject({
			id: expect.stringMatching(/^exp-*/),
			object: 'export',
			created_at: expectTimeIsoString,
			status: 'SCHEDULED',
			channel: 'API',
			exported_object: 'voucher',
			parameters: {},
			result: null,
			user_id: null,
		})
	})

	// it('Should updateCustomersMetadataInBulk', async () => {
	// 	const createdCustomer = await client.customers.create({ name: 'Bob', source_id: generateRandomString() })
	// 	if (!('source_id' in createdCustomer) || typeof createdCustomer?.source_id !== 'string') {
	// 		return
	// 	}
	// 	const metadata = { test: 123 }
	// 	const updateResponse = await client.customers.updateCustomersMetadataInBulk({
	// 		source_ids: [createdCustomer.source_id],
	// 		metadata,
	// 	})
	// 	while ((await client.asyncActions.get(updateResponse.async_action_id)).status !== 'DONE') {
	// 		await new Promise(r => setTimeout(r, 1000))
	// 	}
	// 	const updatedCustomer = await client.customers.get(createdCustomer.id)
	// 	if (!('metadata' in updatedCustomer)) {
	// 		return
	// 	}
	// 	expect(updatedCustomer.metadata).toEqual(metadata)
	// })
})
