'use client'

import { useEffect, useState } from 'react'
import useCartStore from '@/stores/useCartStore'
import { CartItem } from '@/lib/typeDefs'
import { formatCurrency } from '@/lib/utilFunctions'
import Image from 'next/image'
import BackButton from '@/components/backButton'
import { GoToCheckoutButton } from '@/components/orderButtons'
import EmptyCart from '@/components/emptyCart'
import BottomNav from '@/components/bottomNav'

const CartPage = () => {
     const { cart, fetchCart, cartTotal, updateCartCount } = useCartStore()
     const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetchCart()
    // }, [])

    useEffect(() => {
        const loadCart = async () => {
            try {
                await fetchCart()
            } catch (error) {
                console.error('Failed to load cart:', error)
            } finally {
                setLoading(false);
            }
        }
        loadCart().then(r => console.log('Loaded cart'));
    }, []);

    useEffect(() => {
        updateCartCount()
        // calculateCartTotals()
    }, [cart])


    if (loading) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <section className='w-[90%] mx-auto mt-6'>
                <EmptyCart />
            </section>
        )
    }

    const calculateItemTotal = (item: CartItem) => {
        const basePrice = item.menu?.price || 0;
        // add addon calculations here if needed later
        return basePrice * item.quantity;
    };


     return (
          <main className='w-full h-full flex flex-col overflow-hidden'>
               <div className='flex-1 overflow-y-auto'>
                    {/* Header */}
                    <section className='flex justify-center items-center w-[90%] mx-auto mt-4'>
                         <h1 className='text-lg text-secondary-light font-bold'>
                             {
                                 cart.length > 0 ? 'Your order' : ''
                             }
                         </h1>
                    </section>
                    
                    <section className='fixed flex justify-start items-center w-[90%] h-10 top-3 left-1/2 -translate-x-1/2 z-50'>
                         <BackButton />
                    </section>


                    {/* Order Items */}
                        <section className='w-[90%] mx-auto mt-6'>
                            {cart.map((cartItem: CartItem, i) => (
                                <div className='flex justify-between items-start space-y-2 bg-white mb-3' key={i}>
                                    <div className='flex gap-3'>
                                        <div className='relative w-20 h-20 rounded-xl overflow-hidden'>
                                            <Image
                                                src='/Yam and palava sauce-marg-tee.jpg'
                                                // src={cartItem?.menu?.imageUrl}
                                                alt=''
                                                fill
                                                className='object-cover'
                                            />
                                        </div>
                                        <div>
                                            <h3 className='leading-none text-base font-semibold text-black-soft'>{cartItem?.menu?.name}</h3>
                                            {/*<p className='text-xs text-secondary-soft'>+ Package option<br />+ Parmesan chicken</p>*/}
                                            {/*{cartItem.selectedAddons?.map((addon, index) => (*/}
                                            {cartItem.selectedAddons?.package && (
                                                <p className="text-xs text-secondary-soft">
                                                    + {cartItem.selectedAddons.package}
                                                </p>
                                            )}
                                            <span className='text-primary-main font-bold text-[1rem] block mt-1'>
                                                  ₵{formatCurrency(String(calculateItemTotal(cartItem)))}
                                            </span>
                                        </div>
                                    </div>

                                    {/*<QuantitySelector />*/}
                                </div>
                            ))}


                             {/* Total */}
                             <div className='flex justify-between items-center mt-4'>
                                  <span className='text-md text-black-soft font-bold'>Total</span>
                                  <span className='text-primary-main text-md font-extrabold'>₵{formatCurrency(String(cartTotal))}</span>
                             </div>
                        </section>

                    {/* Recommendations */}
               {/*     <section className='w-[90%] mx-auto mt-12 mb-24'>*/}
               {/*          <h2 className='text-md text-secondary-light font-semibold mb-3'>Recommendations</h2>*/}
               {/*          <div className='flex gap-3 overflow-x-auto'>*/}
               {/*               {Array(6).fill(0).map((_, i) => (*/}
               {/*                    // /!* Recommendation 1 *!/*/}
               {/*                    <div className='min-w-[130px] flex-shrink-0 rounded-2xl bg-white shadow-lg p-2 mb-6' key={i}>*/}
               {/*                         <div className='relative w-full h-20 rounded-xl overflow-hidden mb-2'>*/}
               {/*                              <Image src='/Yam and palava sauce-marg-tee.jpg' alt='Tiramisu' fill className='object-cover' />*/}
               {/*                         </div>*/}
               {/*                         <div className='flex justify-between items-center'>*/}
               {/*                              <span className='text-primary-main font-bold text-sm'>₵10.00</span>*/}
               {/*                              <button className='w-4.5 h-4.5 rounded-md bg-primary-main text-white flex items-center justify-center text-base font-bold'>+</button>*/}
               {/*                         </div>*/}
               {/*                         <p className='text-xs text-black-soft mt-1'>Snack</p>*/}
               {/*                    </div>*/}
               {/*               ))}*/}

               {/*          </div>       */}
               {/*     </section>*/}
               </div>

               {/* Checkout section */}
               {cart.length > 0 && (

                   <section className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] bg-transparent py-4 flex justify-between items-center">
                       <GoToCheckoutButton />
                   </section>
               )}
         </main>
     )
}

export default CartPage