import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function OrderConfirmation() {
  return (
    <div className='flex justify-center mt-10'>
        <div className='border shadow-md flex flex-col justify-center 
         p-20 rounded-md items-center gap-2 px-32'>
            <CheckCircle2 className='h-20 w-20 text-primary'></CheckCircle2>
            <h2 className='font-medium text-2xl text-primary text-center'>Order Successful</h2>
            <h2 className=' text-center'>Thankyou so much for order</h2>
            <Link href={'/my-order'}><Button className='mt-8 text-center'>Track your order</Button></Link>
        </div>
    </div>
  )
}

export default OrderConfirmation