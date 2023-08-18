import { voucherifyClient as client } from './client'
import { generateVoucher } from './utils/generateVoucher'
import { generatePromotionTier } from './utils/generatePromotionTier'
// import { generatePromotionTier } from './utils/generatePromotionTier'
// import { ValidationsValidateVoucherResponse } from '@voucherify/sdk'
// import { generateRandomString } from './utils/generateRandomString'

describe('Redemptions API', () => {
	it('should redeem voucher without campaign', async () => {
		const voucher = await generateVoucher()
		const response = await client.redemptions.redeem(voucher.code)
		expect(response.id).toBeDefined()
		expect(response.object).toEqual('redemption')
		expect(response.date).toBeDefined()
		expect(response.customer_id).toEqual(null)
		expect(response.tracking_id).toEqual(null)
		expect(response.metadata).toEqual(null)
		expect(response.result).toEqual('SUCCESS')
		expect(response.order).toEqual(null)
		expect(response.channel).toBeInstanceOf(Object)
		expect(response.customer).toEqual(null)
		expect(response.related_object_type).toEqual('voucher')
		expect(response.related_object_id).toEqual(voucher.id)
		expect(response.voucher).toBeInstanceOf(Object)
	})

	it('should redeem multiple vouchers without campaign', async () => {
		const voucher1 = await generateVoucher()
		const voucher2 = await generateVoucher()
		const response = await client.validations.validateStackable({
			redeemables: [
				{ object: 'voucher', id: voucher1.code },
				{ object: 'voucher', id: voucher2.code },
			],
		})
		expect(response).toBeTruthy()
		expect(response.redeemables).toBeInstanceOf(Array)
	})

	it('should validate promotion tier', async () => {
		const promotionTier = await generatePromotionTier()
		const response = await client.promotions.tiers.redeem(promotionTier.id, {})
		expect(response.id).toBeDefined()
		expect(response.object).toEqual('redemption')
		expect(response.date).toBeDefined()
		expect(response.customer_id).toEqual(null)
		expect(response.tracking_id).toEqual(null)
		expect(response.metadata).toEqual(null)
		expect(response.result).toEqual('SUCCESS')
		expect(response.order).toEqual(null)
		expect(response.channel).toBeInstanceOf(Object)
		expect(response.customer).toEqual(null)
		expect(response.related_object_type).toEqual('promotion_tier')
		expect(response.related_object_id).toEqual(promotionTier.id)
		expect(response.voucher).toEqual(null)
		expect(response.promotion_tier).toBeInstanceOf(Object)
	})

	it('should redeem multiple promotion tiers', async () => {
		const promotionTier1 = await generatePromotionTier()
		const promotionTier2 = await generatePromotionTier()
		const response = await client.validations.validateStackable({
			redeemables: [
				{ object: 'promotion_tier', id: promotionTier1.id },
				{ object: 'promotion_tier', id: promotionTier2.id },
			],
		})
		expect(response).toBeTruthy()
		expect(response.redeemables).toBeInstanceOf(Array)
	})
})
