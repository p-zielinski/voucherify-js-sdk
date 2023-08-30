---
'@voucherify/sdk': major
---

**New exported types/interfaces**
- CreateExportResource
- ExportResourceResponseCommon
- ExportResourceResponse
- ExportsCreateResponseCommon
- ExportsCreateResponse
- ExportsCreateVoucher
- ExportsCreateResponseVoucher
- ExportsCreateVoucherParameters
- FieldConditions
- ExportVoucherFilters
- ExportsCreateRedemption
- ExportsCreateResponseRedemption
- ExportsCreateRedemptionParameters
- ExportRedemptionFilters
- ExportsCreateCustomer
- ExportsCreateResponseCustomer
- ExportsCreateCustomerParameters
- ExportCustomerFilters
- ExportsCreatePublication
- ExportsCreateResponsePublication
- ExportsCreatePublicationParameters
- ExportPublicationFilters
- ExportsCreateOrder
- ExportsCreateResponseOrder
- ExportsCreateOrderParameters
- ExportOrderFilters
- ExportsCreatePointsExpiration
- ExportsCreateResponsePointsExpiration
- ExportsCreatePointsExpirationParameters
- ExportPointsExpirationFilters
- ExportsCreateVoucherTransactionsExpiration
- ExportsCreateResponseVoucherTransactionsExpiration
- ExportsCreateVoucherTransactionsExpirationParameters
- ExportVoucherTransactionsFilters
- ExportsGetResponse
- ListExportQuery
- ListExports
- Junction
- FiltersCondition
- ExportCustomerFields
- ExportCustomerOrder
- ExportPublicationFields
- ExportPublicationOrder
- ExportRedemptionFields
- ExportRedemptionOrder
- ExportVoucherFields
- ExportVoucherOrder
- ExportOrderFields
- ExportOrderOrder
- ExportPointsExpirationFields
- ExportPointsExpirationOrder
- ExportVoucherTransactionsFields
- ExportVoucherTransactionsOrder

**Breaking changes:**
- method voucherify.distributions.exports.create:
  - request parameter
    - `ExportResource` was replaced with `CreateExportResource`
      - `CreateExportResource` is a union of types, to narrow down union type use `exported_object`, or while preparing a request, declare variable with a type, for example: `const request: ExportsCreateVoucher = {...}`

**Example of usage (related to breaking changes):**
```js
const validation = await client.validations.validateVoucher('test')
//First we must to narrow down response type by checking the valid value
//As the response type may be either ResponseValidateVoucherTrue or ResponseValidateVoucherFalse
if (response.valid) {
  //ResponseValidateVoucherTrue
  return { success: true, order: validation.order }
}
//ResponseValidateVoucherFalse
return { success: false, reason: validation.reason || validation.error?.message || 'Unknown error' }
```

