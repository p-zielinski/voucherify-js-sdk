import { DiscountAmount, DiscountPercent, DiscountUnit, DiscountFixed } from './DiscountVoucher'
import { ApplicableToObjectPromotionTier, CreateOrder, InapplicableToObjectPromotionTier, ObjectOrder } from './Orders'

import { CreateCustomer } from './Customers'
import {
	ValidationRulesListAssignmentsResponse,
	ValidationRulesValidationRuleIdAssignmentResponse,
} from './ValidationRules'
import {
	VoucherDiscountAmount,
	VoucherDiscountFixed,
	VoucherDiscountPercentage,
	VoucherDiscountShipping,
	VoucherDiscountUnitMultiple,
	VoucherDiscountUnitOne,
} from './Vouchers'
import { CategoryObject } from './Categories'

export type ValidatePromotionTierResponse = ValidationPromotionTierFalse | ValidationPromotionTierTrue

export interface ValidationPromotionTierTrue {
	//6_res_validate_promotion_tier_true
	valid: boolean
	applicable_to: ApplicableToObjectPromotionTier //6_res_applicable_to_object
	inapplicable_to: InapplicableToObjectPromotionTier //6_res_inapplicable_to_object
	tracking_id: string
	order?: ObjectOrder //6_obj_order_object
	id: string
	name: string
	banner?: string
	discount?:
		| VoucherDiscountAmount
		| VoucherDiscountPercentage
		| VoucherDiscountFixed
		| VoucherDiscountUnitOne
		| VoucherDiscountUnitMultiple
		| VoucherDiscountShipping
	start_date?: string
	expiration_date?: string
	campaign?: {
		id: string
		start_date: string
		expiration_date: string
		active: boolean
		categories: CategoryObject
		object: 'campaign'
	}
	hierarchy?: number
	discount_amount?: number
	applied_discount_amount?: number
	metadata?: Record<string, any>
	object: 'promotion_tier'
	category_id?: string
}

interface ValidationPromotionTierFalse {
	//6_res_validate_promotion_tier_true
	valid: boolean
	reason: string
	error: { message: string } | ErrorNoTranslation
	tracking_id: string
	id: string
	name: string
	banner: string
	discount:
		| VoucherDiscountAmount
		| VoucherDiscountPercentage
		| VoucherDiscountFixed
		| VoucherDiscountUnitOne
		| VoucherDiscountUnitMultiple
		| VoucherDiscountShipping
	start_date: string
	expiration_date: string
	campaign: {
		id: string
		start_date: string
		expiration_date: string
		active: boolean
		object: 'campaign'
	}
	hierarchy: number
	metadata: Record<string, any>
	object: 'promotion_tier'
}

export interface ErrorNoTranslation {
	code?: number
	key?: string
	message: string
	details?: string
	request_id?: string
}

export interface PromotionTiersRedeemResponse {
	id: string
	object: 'redemption'
	date: string
	customer_id?: string
	tracking_id?: string
	metadata?: Record<string, any>
	result?: 'SUCCESS' | 'FAILURE'
	order: Partial<ObjectOrder>
	channel?: {
		channel_id: string
		channel_type: 'USER' | 'API'
	}
	customer?: {
		id: string
		name: string
		email: string
		source_id: string
		metadata: Record<string, any>
		object: 'customer'
	}
	related_object_type: 'promotion_tier'
	related_object_id: string
	voucher: any
	promotion_tier: PromotionTierObject
}

export type PromotionTiersUpdateParams = Partial<UpdatePromotionTier> & { id: string }

interface UpdatePromotionTier {
	name: string
	banner: string
	action: {
		discount:
			| VoucherDiscountAmount
			| VoucherDiscountPercentage
			| VoucherDiscountFixed
			| VoucherDiscountUnitOne
			| VoucherDiscountUnitMultiple
			| VoucherDiscountShipping
	}
	metadata: Record<string, any>
	start_date: string
	expiration_date: string
	validity_timeframe: {
		interval: string
		duration: string
	}
	validity_day_of_week: number[]
	hierarchy: number
	category: string
	category_id: string
}

export interface AddPromotionTierToCampaignBody {
	name?: string
	banner?: string
	action?: {
		discount?:
			| VoucherDiscountAmount
			| VoucherDiscountPercentage
			| VoucherDiscountFixed
			| VoucherDiscountUnitOne
			| VoucherDiscountUnitMultiple
			| VoucherDiscountShipping
	}
	metadata?: Record<string, any>
	active?: boolean
	start_date?: string
	expiration_date?: string
	validity_timeframe?: {
		interval: string
		duration: string
	}
	validity_day_of_week?: number[]
	validation_rules?: string[]
	category?: string
	category_id?: string
}

export interface PromotionTiersListResponse {
	object: 'list'
	data_ref: 'tiers'
	tiers: PromotionTierObject[]
	total: number
	has_more: boolean
}

export type PromotionTierGetResponse = PromotionTierObject
export type PromotionTierUpdateResponse = PromotionTierObject
export type PromotionTiersCreateResponse = PromotionTierObject
export type PromotionTiersDisableResponse = PromotionTierObject
export type PromotionTiersEnableResponse = PromotionTierObject

export interface PromotionTierObject {
	id: string
	created_at: string
	updated_at?: string
	name: string
	banner?: string
	action: {
		discount:
			| VoucherDiscountAmount
			| VoucherDiscountPercentage
			| VoucherDiscountFixed
			| VoucherDiscountUnitOne
			| VoucherDiscountUnitMultiple
			| VoucherDiscountShipping
	}
	metadata?: Record<string, any>
	hierarchy: number
	campaign: {
		id: string
		start_date?: string
		expiration_date?: string
		validity_timeframe?: {
			interval: string
			duration: string
		}
		validity_day_of_week?: number[]
		active: boolean
		category_id?: string
		object: 'campaign'
	}
	campaign_id?: string
	active?: boolean
	start_date?: string
	expiration_date?: string
	validity_timeframe?: {
		interval: string
		duration: string
	}
	validity_day_of_week?: number[]
	summary: {
		redemptions: {
			total_redeemed: number
		}
		orders: {
			total_amount: number
			total_discount_amount: number
		}
	}
	object: 'promotion_tier'
	validation_rule_assignments: ValidationRulesValidationRuleIdAssignmentResponse
	category_id?: string
	categories?: CategoryObject
}

export interface SimplePromotionTier {
	tracking_id: string
	metadata?: Record<string, any>
	valid: boolean
	id: string
	name: string
	banner?: string
	discount: DiscountUnit | DiscountPercent | DiscountAmount | DiscountFixed
	hierarchy: number
	object: 'promotion_tier'
}
export interface PromotionTier {
	id: string
	object: 'promotion_tier'
	name: string
	banner?: string
	campaign: {
		id: string
		object: 'campaign'
		start_date?: string
		expiration_date?: string
		active: boolean
	}
	validation_rule_assignments: ValidationRulesListAssignmentsResponse
	action: {
		discount: DiscountUnit | DiscountPercent | DiscountAmount | DiscountFixed
	}
	hierarchy: number
	metadata?: Record<string, any>
	active?: boolean
}

export interface PromotionTiersListAllParams {
	order?: 'created_at' | '-created_at' | 'updated_at' | '-updated_at'
	is_available?: boolean
	limit?: number
	page?: number
}

export interface PromotionTiersListAllResponse {
	object: 'list'
	data_ref: 'tiers'
	tiers: PromotionTierObject[]
	total: number
}

export interface PromotionTiersCreateParams {
	name?: string
	banner?: string
	action?: {
		discount?: DiscountUnit | DiscountPercent | DiscountAmount | DiscountFixed
	}
	metadata?: Record<string, any>
}

export type ValidatePromotionTier = PromotionTiersRedeemParams
export interface PromotionTiersRedeemParams {
	customer?: CreateCustomer
	order?: Partial<CreateOrder> & { id?: string }
	metadata?: Record<string, any>
}

export interface PromotionTierRedeemDetailsSimple {
	id: string
	name: string
	banner?: string
	campaign: {
		id: string
	}
}

export type PromotionTierRedeemDetails = PromotionTier & {
	summary: {
		redemptions: {
			total_redeemed: number
		}
		orders: {
			total_amount: number
			total_discount_amount: number
		}
	}
}
