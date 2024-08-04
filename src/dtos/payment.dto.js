export const viewProductResponseDTO=async(product)=>{
    return {
        id:product.id,
        price:product.price,
        credit:product.credit,
        discountRatio:product.discount_ratio
    }
}

export const viewPaylogResponseDTO=async(log)=>{
    return{
        id:log.id,
        createdAt:log.created_at,
        productId:log.product_id,
        credit:log.credit,
        method:log.method
    }
}