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

export interface ExportResourceResponse {
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
	parameters: {
		fields?: string[]
		filters?: {
			junction?: string
		} & Record<string, any>
	}
	result: {
		url: string
	} | null
	user_id: string | null
}

export interface ExportsCreateResponse {
	id: string
	object: 'export'
	created_at: string
	status: 'SCHEDULED'
	channel?: string
	exported_object:
		| 'voucher'
		| 'redemption'
		| 'customer'
		| 'publication'
		| 'order'
		| 'points_expiration'
		| 'voucher_transactions'
	parameters: {
		fields?: string[]
		filters?: {
			junction?: string
		} & Record<string, any>
	}
	result: null
	user_id: string | null
}

export type ExportsGetResponse = ExportResourceResponse

export interface ListExportQuery {
	limit?: number
	order?: 'created_at' | '-created_at' | 'status' | '-status'
	page?: number
}

export interface ListExports {
	object: 'list'
	data_ref: 'exports'
	exports: ExportResourceResponse[]
	total: number
}
