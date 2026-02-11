"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import API from "@/lib/api"
import { Button } from "@/components/ui/Button"
import { useCartStore } from "@/lib/store"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const addItem = useCartStore((state) => state.addItem)
  
  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`)
      setProduct(res.data)
    }
    fetchProduct()
  }, [id])

  if (!product) return <p>Loading...</p>

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    })
    alert("Added to cart!")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <img src={product.images[0]} alt={product.name} className="w-full rounded-xl shadow-lg" />
      
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold text-primary">${product.price}</p>
        
        {/* BUG A4: XSS via dangerouslySetInnerHTML */}
        <div 
          className="prose max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: product.description }} 
        />

        <div className="pt-6">
          <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-12">
          Debug info: Screen Width {screenWidth}px
        </p>
      </div>
    </div>
  )
}