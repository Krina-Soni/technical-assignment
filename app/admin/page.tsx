"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await API.get("/products")
        setProducts(res.data)
      } catch (err) {
        alert("Access Denied")
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardHeader><CardTitle>Total Products</CardTitle></CardHeader><CardContent className="text-4xl font-bold">{products.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Active Orders</CardTitle></CardHeader><CardContent className="text-4xl font-bold">12</CardContent></Card>
        <Card><CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader><CardContent className="text-4xl font-bold">$12,450</CardContent></Card>
      </section>

      <Card>
        <CardHeader><CardTitle>Inventory Management</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p._id} className="border-b">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.inventory}</td>
                  <td className="p-2">${p.price}</td>
                  <td className="p-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}