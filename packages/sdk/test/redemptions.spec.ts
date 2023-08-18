import { voucherifyClient as client } from './client'
import { generateRandomString } from './utils/generateRandomString'
import { PromotionTier } from '@voucherify/sdk'
// import { ValidationsValidateVoucherResponse } from '@voucherify/sdk'
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

	const generatePromotionTier = async (): Promise<PromotionTier> => {
		const createdPromotions = await client.promotions.create({
			name: generateRandomString(),
			campaign_type: 'PROMOTION',
			promotion: {
				tiers: [
					{
						name: generateRandomString(60),
						action: {
							discount: {
								// @ts-ignore
								type: 'AMOUNT',
								amount_off: 1000,
							},
						},
					},
				],
			},
		})
		if (!createdPromotions.promotion.tiers?.[0]) {
			throw new Error('Could not create promotion')
		}
		return createdPromotions.promotion.tiers[0]
	}

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
