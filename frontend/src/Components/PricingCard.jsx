import React from 'react'
import styled from 'styled-components'
// type:"Basic",
//     price:"0",
//     MonetiztionFees:"12.5%",
//     storage:20,
//     AccessMonetization:false,
//     commissionFees:3,
//     freeMonthlyPrompt:20,
//     platformFees:15,
//     createPrivateCollections:true,
//     ArtProtect:true,
//     analyticsAndInsight:false,
export default function PricingCard({type,price,MonetiztionFees,storage,link,AccessMonetization,commissionFees,analyticsAndInsight,ArtProtect,freeMonthlyPrompt,platformFees,createPrivateCollections}) {
  return (
    <DIV>
        <PriceCard className='priceCard'>
        <h2>{type}</h2>
        <h4>${price}</h4>
        <button onClick={()=>window.location.href=link}>{price=="0"?"Get Started":"Upgrade"}</button>
        
        <div className='priceCarddetails'>
        <p>{MonetiztionFees} Monetization Fee</p>
        <p>{storage}GB storage</p>
        <p>{commissionFees}% Commission Fee</p>
        <p>{freeMonthlyPrompt} Free Monthly Prompts</p>
        <p>{platformFees}% Platform Fee</p>
        <p>{ArtProtect?"Art Protect":""}</p>
        </div>
        
      
        </PriceCard>
        
       
    </DIV>
  )
}
const PriceCard=styled.div`


margin-top: 20px;
margin-bottom: 30px;
border-radius: 13px;
padding: 15px;
background-color: #353434;
h2{
    font-size: 30px;
}
h4{
    font-size: 25px;
}
button{
    background-color: #91D9A8;
    padding: 10px;
    border-radius: 9px;
    font-size: 20px;
    font-weight: 200;
}
button:hover{
    cursor: pointer;
}
.priceCarddetails{
   
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
    p{
       font-size: 15px;
      
    }
}

@media only screen and (max-width: 750px){
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 8px;
    padding: 5px;
    background-color: #353434;
    h2{
        font-size: 20px;
    }
    h4{
        font-size: 20px;
    }
    button{
        background-color: #91D9A8;
        padding: 5px;
        border-radius: 9px;
        font-size: 15px;
        font-weight: 200;
    }
    button:hover{
        cursor: pointer;
    }
    .priceCarddetails{
    
        box-sizing: border-box;
        text-align: center;
        padding: 5px;
        p{
        font-size: 15px;
        
        }
    }

    

    
}

`

const DIV=styled.div`
.priceCard:hover{
    transform: scale(1.1);
    box-shadow: rgba(194, 192, 192, 0.35) 0px 5px 15px;
    
   
}
`
