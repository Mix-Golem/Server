import { BaseError } from "../../config/error.js";
import {status} from "../../config/response.status.js"

//상품 불러오기
export const viewProductService= async()=>{
    
    const productData= await viewProductDAO();
    const products=[];
    for(let i=0; i<productData.length();i++){
        products.push(viewProductResponseDTO(productData[i]))
    }
    return products ;

}
//결제 서비스
export const buyProductService=async(req)=>{


}
//결제 내역 불러오기
export const viewPaylogService=async(req)=>{
    const paylogData= await viewPaylogDAO(req);
    return viewPaylogResponseDTO(paylogData);
}