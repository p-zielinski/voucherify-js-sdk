---
'@voucherify/sdk': minor
---

Added missing endpoints: 




- type `ClientSideValidateResponse` related to:
    - response for GET `/validate`
- type `SimplePromotionTier` related to:
    - response GET `/promotions/validation`
- type `PromotionsCreate` related to:
    - params for POST `/campaigns`
- type `PromotionsValidateResponse` related to:
    - response for POST `/promotions/validation`
- type `VouchersResponse` related to:
    - response for POST `/redeem`
    - response for POST `/vouchers/qualification`
    - params for POST and PUT `/vouchers/${encode(voucher.code)}`
    - response for GET `/vouchers/${encode(code)}`
    - response POST `loyalties/{campaignId}/members/{memberId}/redemption`
    - response POST `/vouchers/${encode(code)}/enable`
    - response POST `/vouchers/${encode(code)}/disable`
- type `VouchersImport` related to:
    - params for POST `/vouchers/import`
- type `PromotionTier` related to:
    - response for GET `/promotions/tiers`
    - response for GET `/promotions/${encode(promotionId)}/tiers`
    - response for POST `/promotions/tiers/${encode(promotionsTierId)}/redemption`
    - response for POST `/vouchers/${encode(code)}/redemption`
- type `PromotionTiersCreateParams` related to:
    - params for POST `/promotions/${encode(promotionId)}/tiers`
- type `ValidationsValidateVoucherResponse` related to:
    - response for POST `/vouchers/${encode(code)}/validate`
- type `SimpleVoucher` related to:
    - response GET/PUT/POST `/campaigns/${encode(name)}`
    - response GET `/campaigns`
    - params POST `/campaigns`
    - response POST `/campaigns/qualification`
