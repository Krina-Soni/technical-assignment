"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import API from "@/lib/api"
import { useRouter } from "next/navigation"

const schema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  zip: z.string().min(5),
  card: z.string().min(16),
})

export default function CheckoutPage() {
  const { items, setItems } = useCartStore()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const payload = {
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity, priceAtTime: i.price })),
        shippingAddress: data,
        total,
        paymentMethodId: "pm_card_visa" // Mocked
      }
      
      const res = await API.post("/orders/checkout", payload)
      setItems([])
      router.push("/dashboard")
    } catch (err: any) {
      alert(err.response?.data?.message || "Checkout failed")
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Shipping & Payment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Full Name" {...register("name")} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
            </div>
            <div>
              <Input placeholder="Address" {...register("address")} />
              {errors.address && <p className="text-xs text-red-500">{errors.address.message as string}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="City" {...register("city")} />
              <Input placeholder="ZIP" {...register("zip")} />
            </div>
            <div>
              <Input placeholder="Card Number (16 digits)" {...register("card")} />
              {errors.card && <p className="text-xs text-red-500">{errors.card.message as string}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center bg-muted p-6 rounded-xl">
          <span className="text-xl font-bold">Total: ${total}</span>
          
          {/* BUG F3: Submit button disabled but Enter key still works in some browsers/setups */}
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </form>
    </div>
  )
}