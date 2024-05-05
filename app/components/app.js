"use client"
import React, { useState } from "react"
const App = () => {
    const [ price, setPrice ] = useState("")

    const handleInputChange = (value) => {
        let parsedValue = value.replace(/[^0-9.-]/g, '');
        const dotIndex = parsedValue.indexOf('.');

        if (dotIndex !== -1) {
            const beforeDot = parsedValue.substring(0, dotIndex);
            const afterDot = parsedValue.substring(dotIndex + 1);
            parsedValue = beforeDot + '.' + afterDot.replace(/[.,]/g, ''); // nokta veya virgülü temizle
          }
        setPrice(parsedValue)
    }

    let money = (price === "" || price === "-") ? 0 : parseFloat(price)  ;  
    let fixedFee = money === 0 ? 0 : 0.30;
    const stripeRate = 2.9;
    let stripeFee = (money * stripeRate)/100 + fixedFee;

    let breakEven = (money + fixedFee)*100 / (100 - stripeRate)

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

    return (
        <div className="p-2">
          <div className="bg-white w-full max-w-[420px] h-96 rounded-3xl p-10 flex flex-col">
          <div className="font-gabarito text-xl">Enter an invoice amount</div>
          <div className="w-full flex justify-center items-center h-full border-b border-[#c0c0c0] relative">
            <input
              type="text"
              className="w-full h-10 rounded-3xl p-4 text-lg font-gabarito border border-[#6e6e6d]"
              placeholder="$0,000.00"
              onChange={(e) => handleInputChange(e.target.value)}
              value={price}
            />
            <span className="absolute font-gabarito left-[6px]">{price === "" ? "" : "$"}</span>
          </div>

        <div className="w-full flex justify-center items-center h-full">

          <div className="flex flex-col w-full">
            <div className="font-gabarito text-sm text-[#6e6e6d] flex justify-start">Stripe fee</div>
                <div className="font-gabarito flex justify-start overflow-hidden whitespace-nowrap text-overflow-ellipsis" style={{ maxWidth: '100px', overflow: 'hidden' }}>
                {formatNumberWithCommas(stripeFee === 0 ? '-' : `$ ${stripeFee.toFixed(2)}`)}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-gabarito text-sm text-[#6e6e6d] flex justify-start">You will receive</div>
                <div className="font-gabarito flex justify-start overflow-hidden whitespace-nowrap text-overflow-ellipsis" style={{ maxWidth: '100px', overflow: 'hidden' }}>
                {formatNumberWithCommas((money - stripeFee) === 0 ? '-' : `$ ${(money - stripeFee).toFixed(2)}`)}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-gabarito text-sm text-[#6e6e6d] flex justify-start">You should ask for</div>
                <div className="font-gabarito flex justify-start overflow-hidden whitespace-nowrap text-overflow-ellipsis" style={{ maxWidth: '100px', overflow: 'hidden' }}>
                {formatNumberWithCommas(breakEven === 0 ? '-' : `$ ${breakEven.toFixed(2)}`)}
                </div>
          </div>

        </div>
          
          <div className="font-gabarito text-sm flex justify-center items-center">
          The amounts are calculated based on the US Stripe fee of 2.9% + $0.30 per transaction. Unlike other invoice solutions, Startxpress Invoices does not charge additional fees on top of those from the payment processor.
          </div>
      </div>
        </div>
    )
}

export default App