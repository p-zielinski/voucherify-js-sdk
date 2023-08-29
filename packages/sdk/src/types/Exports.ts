export interface ExportResource {
	exported_object:
		| 'voucher'
		| 'redemption'
		| 'customer'
		| 'publication'
		| 'order'
		| 'points_expiration'
		| 'voucher_transactions'
	parameters?: {
		order?: string
		fields?: string[]
		filters?: {
			junction?: 'AND' | 'OR'
		} & Record<string, any>
	}
}

export interface ExportsCreateResponse {
	id: string
	object: 'export'
	created_at: string
	status: 'SCHEDULED' | 'IN_PROGRESS' | 'DONE' | 'ERROR'
	channel?: string
	exported_object:
		| 'voucher'
		| 'redemption'
		| 'customer'
		| 'publication'
		| 'order'
		| 'points_expiration'
		| 'voucher_transactions'
	parameters?: {
		fields?: string[]
		filters?: {
			junction?: string
		} & Record<string, any>
	}
	result?: {
		url: string
	}
}

export type ExportsGetResponse = ExportsCreateResponse
