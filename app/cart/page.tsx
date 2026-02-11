"use client"

import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import Link from "next/link"

export default function CartPage() {
  const { items, setItems } = useCartStore()

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.productId !== id))
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products"><Button>Go Shopping</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.productId}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => removeItem(item.productId)}>Remove</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Summary</h2>
            <div className="flex justify-between border-t pt-4">
              <span>Subtotal</span>
              <span>${total}</span> 
              {/* BUG: Displays raw float */}
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="w-full mt-4">Checkout</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}