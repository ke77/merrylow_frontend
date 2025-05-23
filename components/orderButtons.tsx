'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Product, SelectedAddons } from '@/lib/typeDefs'
import useCartStore from '@/stores/useCartStore'
import { getAccessToken } from '@/lib/auth'
import { formatCurrency } from '@/lib/utilFunctions'
import axios from 'axios'


const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_URL

const AddToOrderButton = ({ product, quantity, selectedAddons, orderNote }: { product: Product, quantity: number, selectedAddons: SelectedAddons | null, orderNote: string | null }) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const addToCart = useCartStore(state => state.addToCart)
    const fetchCart = useCartStore(state => state.fetchCart)
    const cart = useCartStore(state => state.cart)
    const cartTotal = useCartStore(state => state.cartTotal)
    const calculateItemTotal = useCartStore(state => state.calculateItemTotal)
    const currentItemTotal = product
        ? calculateItemTotal(product, quantity, selectedAddons)
        : 0

    // useEffect(() => {
    //     fetchCart()
    // }, [])

    const handleClick = async () => {
        setLoading(true)
        if (!product) {
            toast.error('Product not loaded');
            return;
        }

        try {
            addToCart(product, quantity, selectedAddons, orderNote)

            // if (success) {
            //     await new Promise(resolve => setTimeout(resolve, 200))
            // setTimeout(() => {
            //     router.push('/cart')
            // }, 3000)

            // }
        } catch (error) {
            console.error('Add to cart error', error)
            toast.error('Try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleClick}
            className='w-[55%] max-w-[450px] h-[2.65rem] mx-auto flex items-center justify-center gap-1.5 font-bold text-sm btn'
        >
            <span>Add to order</span>

            {
                loading ? (
                    <span className='loading loading-spinner loading-sm'></span>
                ) : (
                    <span>₵{formatCurrency(String(currentItemTotal))}</span>
                )
            }
        </button>
    )
}


const GoToCheckoutButton = () => {
    const cartTotal = useCartStore(state => state.cartTotal)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const cart = useCartStore(state => state.cart)
    const fetchCart = useCartStore(state => state.fetchCart)

    useEffect(() => {
        fetchCart()
    }, [])

    const handleCheckout = async () => {
        setLoading(true)

        try {
            const cartItems = cart.map(cartItem => ({
                id: cartItem.id,
                quantity: cartItem.quantity
            }))

            const accessToken = getAccessToken()
            const response = await axios.post(`${API_URL}/api/checkout`, cartItems , {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(response.status === 200) {
                router.push('/checkout')
            } else {
                console.error('Checkout error: ', response.data?.message)
                toast.error('Please try that again')
            }

        } catch(error) {
            console.error('Checkout error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={handleCheckout}
                className='w-full h-11 max-w-[450px] mx-auto px-7 flex items-center justify-between font-bold text-[15px] btn'
            >
                {
                    loading ? (
                        <>
                            <span>Processing...</span>
                            <span className='loading loading-spinner loading-sm'></span>
                        </>
                    ) : (
                        <>
                            <span>Go to checkout</span>
                            <span>₵{cartTotal}</span>
                        </>
                    )
                }
            </button>
        </>
    )
}


const PlaceOrderButton = ({ name, phone, notes, address, paymentMethod }: { name: string; phone: string; notes: string; address: string; paymentMethod: string; }) => {
    // const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const customerDetails = {
                name,
                address,
                phone,
                notes,
                paymentMethod
            }

            // const accessToken = localStorage.getItem('accessToken')
            const accessToken = getAccessToken()
            const response = await axios.post(`${API_URL}/api/order`, { name, address, phone, notes, paymentMethod }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(response)

            if(response.status === 200) {
                // router.push('/')
                toast('Order placed!')
                console.log('Order placed')
            } else {
                console.error('Checkout error: ', response.data?.message)
                toast.error('Something happened. Please try that again')
            }

        } catch(error) {
            console.error('Checkout error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={handlePlaceOrder}
                className='w-full max-w-[450px] mx-auto h-11 px-7 font-bold text-[15px] btn'
                type='submit'>
                {
                    loading ? (
                        <div className='flex item-center justify-center space-x-1.5'>
                            <span className='loading loading-spinner loading-sm'></span>
                            <span>Processing...</span>
                        </div>
                    ) : (
                            <span>Place Order</span>
                    )
                }
            </button>
        </>
    )
}

export { PlaceOrderButton, GoToCheckoutButton, AddToOrderButton }