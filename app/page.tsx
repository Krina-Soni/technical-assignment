"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

const flashSaleEnd = new Date("2026-12-31T23:59:59Z")

export default function Home() {
  const [timeLeft, setTimeLeft] = useState("")
  
  const showBanner = Math.random() > 0.5

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = flashSaleEnd.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const mins = Math.floor((diff / (1000 * 60)) % 60)
      const secs = Math.floor((diff / 1000) % 60)
      setTimeLeft(`${hours}h ${mins}m ${secs}s`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-8">
      {showBanner && (
        <div className="bg-primary text-primary-foreground p-8 rounded-xl text-center">
          <h1 className="text-4xl font-bold mb-4">Winter Sale is LIVE!</h1>
          <p className="text-xl">Flash sale ends in: <span className="font-mono">{timeLeft || "..."}</span></p>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Electronics", "Clothing", "Home"].map((cat) => (
            <Card key={cat}>
              <CardHeader>
                <CardTitle>{cat}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/products?category=${cat}`}>
                  <Button variant="outline" className="w-full">Browse {cat}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to shop?</h2>
        <Link href="/products">
          <Button size="lg">View All Products</Button>
        </Link>
      </section>
    </div>
  )
}