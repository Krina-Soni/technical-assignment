"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import API from "@/lib/api"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const res = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data))
      router.push("/products")
    } catch (err: any) {
      alert("Login failed")
    }
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <Card>
        <CardHeader><CardTitle className="text-center">Login</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <div className="mt-6 text-sm text-center text-muted-foreground">
            <p>Admin: admin@test.com / admin123</p>
            <p>User: user@test.com / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}