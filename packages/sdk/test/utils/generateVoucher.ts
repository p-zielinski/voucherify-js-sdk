import { voucherifyClient as client } from '../client'

export const generateVoucher = async () =>
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
