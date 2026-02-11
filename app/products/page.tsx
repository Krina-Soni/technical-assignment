"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import API from "@/lib/api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Link from "next/link"
import io from "socket.io-client"

function ProductsList() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get("search") || "")

  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const category = searchParams.get("category")
      const res = await API.get("/products", { params: { category, search, page } })
      if (page === 1) {
        setProducts(res.data)
      } else {
        setProducts(prev => [...prev, ...res.data])
      }
      if (res.data.length < 10) setHasNextPage(false)
      setLoading(false)
    }
    fetchProducts()
  }, [searchParams, search, page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        setPage(prev => prev + 1) 
      }
    })
    const target = document.querySelector("#scroll-target")
    if (target) observer.observe(target)
    return () => observer.disconnect()
  }, [hasNextPage]) 

  useEffect(() => {
    const socket = io("http://localhost:3001")
    
    socket.on("inventory-update", ({ productId, newInventory }) => {
      setProducts((prev: any) => 
        prev.map((p: any) => p._id === productId ? { ...p, inventory: newInventory } : p)
      )
    })

  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold">Catalog</h1>
        <div className="w-full md:w-96">
          <Input 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Card key={product._id} className="flex flex-col">
              <CardHeader>
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold mt-4">${product.price}</p>
                <p className="text-sm mt-1">Stock: {product.inventory}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/products/${product._id}`} className="w-full">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div id="scroll-target" className="h-20" />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <ProductsList />
    </Suspense>
  )
}
