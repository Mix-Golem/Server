import express from "express";

import { viewPaylogController
    ,viewProductController,
    buyProductController
 } from "../controllers/payment.controller";


export const paymentRoute = express.Router();



paymentRoute.get("/product",async (res)=>{
   const reuslt= await viewProductController(res);
})

paymentRoute.post("",async(req,res)=>{
    const result = await buyProductController(req,res);
})

paymentRoute.get("",async (req,res)=>{
    const reuslt = await viewPaylogController(req,res);
})