"use client"

import Link from "next/link"
import { useCartStore } from "@/lib/store"
import { ShoppingCart, User, Package } from "lucide-react"

export default function Header() {
  const { items } = useCartStore()
  
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">QA E-Shop</Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/products" className="hover:text-primary">Products</Link>
          <Link href="/cart" className="relative hover:text-primary">
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="/login" className="hover:text-primary">
            <User className="w-6 h-6" />
          </Link>
          <Link href="/admin" className="hover:text-primary">
            <Package className="w-6 h-6" />
          </Link>
        </nav>
      </div>
    </header>
  )
}