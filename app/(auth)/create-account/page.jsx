"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function CreateAccount() {

    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword ]=useState();
    const [loader,setLoader]=useState();

    const router=useRouter();

    useEffect(()=>{
        const jwt=sessionStorage.getItem('jwt');
        if(jwt){
            router.push('/')
        }
    },[]);

    const onCreateAccount=()=>{
        setLoader(true);
        GlobalApi.registerUser(username,email,password).then(resp=>{
            console.log(resp.data.user);
            console.log(resp.data.jwt);
            sessionStorage.setItem('user',JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt',resp.data.jwt);
            toast("Account Created Successfully");
            router.push('/');
            setLoader(false);

        }),(e)=>{
            toast(e?.response?.data.error.message);
            setLoader(fales);
        }
    }

  return (
    <div className='flex items-baseline justify-center my-7'>
        <div className='flex flex-col items-center justify-center 
        p-7 bg-slate-100 border border-gray-200 rounded-lg'>
            <Image src='/logo.png' width={140} height={140} alt='logo'/>
            <h2 className='font-bold text-xl' >Create Account</h2>
            <h2 className='text-gray-500 text-sm'>Enter your Email and Password to Create an Account</h2> 
            <div className='w-full flex flex-col gap-5 mt-5'>
                <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}></Input>
                <Input placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)}></Input>
                <Input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} ></Input>
                <Button onClick={()=>onCreateAccount()} 
                disabled={!(username && email && password)}
                >{loader?<LoaderIcon className='animate-spin'/>:'Create an Account'}</Button>
                <p className='text-sm'>Already have an account ?
                    <Link href={'/sign-in'} className='text-blue-500'>
                        Click here to Sign In
                    </Link>
                </p>
            </div>
        </div>
        
    </div>
  )
}

export default CreateAccount