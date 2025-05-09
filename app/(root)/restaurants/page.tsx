import Link from "next/link"
import Card from "@/components/card"

const RestaurantsPage = () => {
     return (
          <main className="min-h-screen flex flex-col items-center space-y-5">
               <section className="w-[90%]">
                    <h1 className="page-heading text-xl font-bold text-secondary-soft -mt-1">Restaurants</h1>
               </section>

               <section className="w-[90%] h-[80%]">
                    <h2 className="tracking-wide text-lg font-bold mb-1.5">All restaurants</h2>

                    <div className="h-[160rem] flex flex-col gap-9">
                         {Array(8).fill(0).map((_, i) => (
                              <Link href='/restaurants/1' className="w-full h-[17rem]" key={i}>
                                   <Card
                                        cardClass="w-full"
                                        cardDetails={{
                                             imgSrc: '/Yam and palava sauce-marg-tee.jpg',
                                             mealName: 'Tasty bowl',
                                             mealDescription: 'Choose from a variety of...'
                                        }}
                                   />
                              </Link>
                         ))}
                    </div>
               </section>

               <div className="mb-20" />
          </main>
     )
}

export default RestaurantsPage