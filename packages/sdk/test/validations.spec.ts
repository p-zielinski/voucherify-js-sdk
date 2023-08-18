import { voucherifyClient as client } from './client'
import { generateVoucher } from './utils/generateVoucher'
import { generatePromotionTier } from './utils/generatePromotionTier'
// import { ValidationsValidateVoucherResponse } from '@voucherify/sdk'
// import { generateRandomString } from './utils/generateRandomString'

describe('Validations API', () => {
	it('should validate voucher without campaign', async () => {
		const code = (await generateVoucher()).code
		const response = await client.validations.validateVoucher(code)
		expect(response).toHaveProperty('valid')
		expect(response).toHaveProperty('applicable_to')
		expect(response).toHaveProperty('inapplicable_to')
		expect(response).toHaveProperty('code')
		expect(response).toHaveProperty('metadata')
	})

	it('should validate voucher without campaign', async () => {
		const code = (await generateVoucher()).code
		const response = await client.validations.validate(code)
		expect(response).toHaveProperty('valid')
		expect(response).toHaveProperty('applicable_to')
		expect(response).toHaveProperty('inapplicable_to')
		expect(response).toHaveProperty('code')
		expect(response).toHaveProperty('metadata')
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

	it('should validate voucher promotion tier', async () => {
		const promotionTier = await generatePromotionTier()
		const response = await client.promotions.tiers.validate(promotionTier.id, {})
		expect(response).toHaveProperty('valid')
		expect(response).toHaveProperty('applicable_to')
		expect(response).toHaveProperty('inapplicable_to')
		expect(response.id).toEqual(promotionTier.id)
		expect(response.name).toHaveProperty(promotionTier.name)
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
