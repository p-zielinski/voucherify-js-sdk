import { voucherifyClient as client } from './client'
import { expectTimeIsoString } from './utils/expectTimeIsoString'
import { ExportsCreateVoucher, ExportVoucherFields, ExportVoucherFilters } from '@voucherify/sdk'

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
		const exported_object = 'voucher',
			fields: ExportVoucherFields[] = ['id', 'code', 'voucher_type', 'value', 'discount_type'],
			filters: ExportVoucherFilters = { code: { conditions: { $is_unknown: true } } }
		const result = await client.distributions.exports.create({
			exported_object,
			parameters: {
				fields,
				filters,
			},
		})
		//we must narrow down result type, otherwise we will have hard time with 'parameters' type
		expect(result.exported_object).toEqual(exported_object)
		if (result.exported_object !== exported_object) {
			return
		}
		//we must find out if 'fields' and 'filters' are defined, to figure out its value
		expect(result.parameters.fields).toBeDefined()
		if (!result.parameters.fields) {
			return
		}
		expect(result.parameters.filters).toBeDefined()
		if (!result.parameters.filters) {
			return
		}
		expect(result.parameters.fields.includes('code')).toBeTruthy()
		expect(result).toMatchObject({
			id: expect.stringMatching(/^exp-*/),
			object: 'export',
			created_at: expectTimeIsoString,
			status: 'SCHEDULED',
			channel: 'API',
			exported_object,
			parameters: { fields, filters },
			result: null,
			user_id: null,
		})
	})
})
