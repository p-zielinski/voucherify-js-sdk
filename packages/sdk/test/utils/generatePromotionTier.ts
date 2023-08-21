import { PromotionTier } from '@voucherify/sdk'
import { generateCampaignWithOnePromotionTier } from './generateCampaignWithOnePromotionTier'

export const generatePromotionTier = async (): Promise<PromotionTier> => {
	const campaign = await generateCampaignWithOnePromotionTier()
	if (!campaign.promotion.tiers?.[0]) {
		throw new Error('Could not create promotion')
	}
	return campaign.promotion.tiers[0]
}
