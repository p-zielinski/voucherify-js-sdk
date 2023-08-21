import { voucherifyClient as client } from './client'
import { generateVoucher } from './utils/generateVoucher'
import { generatePromotionTier } from './utils/generatePromotionTier'
import { generateRandomString } from './utils/generateRandomString'

describe('Validations API', () => {
	it('while validating not existing code, should get error message', async () => {
		const response = await client.validations.validateVoucher(generateRandomString(55))
		if (!response.valid) {
			expect(typeof response.reason).toBe('string')
			expect(typeof response.error?.message).toBe('string')
			expect(typeof response.error?.key).toBe('string')
			expect(typeof response.error?.code).toBe('number')
		}
	})

	it('should validate voucher without campaign', async () => {
		const code = (await generateVoucher()).code
		const response = await client.validations.validate(code)
		if (response.valid === true && 'discount' in response) {
			expect(response.discount.type).toEqual('AMOUNT')
			if (response.discount.type === 'AMOUNT') {
				expect(typeof response.discount.amount_off).toEqual('number')
			}
		}
	})

	it('should validate multiple vouchers without campaign', async () => {
		const response = await client.validations.validateStackable({
			redeemables: [
				{ object: 'voucher', id: (await generateVoucher()).code },
				{ object: 'voucher', id: (await generateVoucher()).code },
			],
		})
		expect(response).toBeTruthy()
		expect(response.redeemables).toBeInstanceOf(Array)
	})

	it('should validate promotion tier', async () => {
		const promotionTier = await generatePromotionTier()
		const response = await client.promotions.tiers.validate(promotionTier.id, {})
		expect(response).toHaveProperty('valid')
		expect(response).toHaveProperty('applicable_to')
		expect(response).toHaveProperty('inapplicable_to')
		expect(response.id).toEqual(promotionTier.id)
		expect(response.name).toEqual(promotionTier.name)
		expect(response).toHaveProperty('campaign')
		expect(response).toHaveProperty('hierarchy')
		expect(response).toHaveProperty('metadata')
		expect(response.object).toEqual('promotion_tier')
		expect(response).toHaveProperty('metadata')
	})

	it('should validate multiple promotion tiers', async () => {
		const response = await client.validations.validateStackable({
			redeemables: [
				{ object: 'promotion_tier', id: (await generatePromotionTier()).id },
				{ object: 'promotion_tier', id: (await generatePromotionTier()).id },
				{ object: 'promotion_tier', id: (await generatePromotionTier()).id },
			],
		})
		expect(response).toBeTruthy()
		expect(response.redeemables).toBeInstanceOf(Array)
	})
})
