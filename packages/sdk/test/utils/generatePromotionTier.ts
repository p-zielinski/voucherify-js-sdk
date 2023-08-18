import { PromotionTier } from '@voucherify/sdk'
import { voucherifyClient as client } from '../client'
import { generateRandomString } from './generateRandomString'

export const generatePromotionTier = async (): Promise<PromotionTier> => {
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
