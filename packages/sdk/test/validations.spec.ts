import { voucherifyClient as client } from './client'
import { generateVoucher } from './utils/generateVoucher'
import { generatePromotionTier } from './utils/generatePromotionTier'
import { generateRandomString } from './utils/generateRandomString'
import { generateCampaignWithOnePromotionTier } from './utils/generateCampaignWithOnePromotionTier'

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
		const campaign = await generateCampaignWithOnePromotionTier()
		const promotionTier = campaign.promotion.tiers?.[0]
		if (!promotionTier) {
			return
		}
		const response = await client.promotions.tiers.validate(promotionTier.id, {})
		expect(response.valid).toEqual(true)
		if ('applicable_to' in response) {
			expect(Array.isArray(response?.applicable_to.data)).toEqual(true)
			expect(Array.isArray(response?.inapplicable_to.data)).toEqual(true)
			expect(response.id).toEqual(promotionTier.id)
			expect(response.name).toEqual(promotionTier.name)
			expect(response.campaign?.id).toEqual(campaign.id)
			expect(typeof response.hierarchy).toEqual('number')
			expect(typeof response.metadata).toEqual('object')
			expect(response.object).toEqual('promotion_tier')
			expect(response.category_id).toEqual(null)
		}
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
