"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [salesProgress, setSalesProgress] = useState(0)
  const [ordersProgress, setOrdersProgress] = useState(0)
  const [customersProgress, setCustomersProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Animate progress bars
    const interval = setInterval(() => {
      setSalesProgress((prev) => {
        if (prev >= 78) return 78
        return prev + 2
      })
      setOrdersProgress((prev) => {
        if (prev >= 65) return 65
        return prev + 2
      })
      setCustomersProgress((prev) => {
        if (prev >= 92) return 92
        return prev + 2
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 text-white/70">Welcome back! Here's an overview of your store</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            <Calendar className="mr-2 h-4 w-4" />
            May 2025
          </Button>
          <Button className="bg-gold-500 text-black hover:bg-gold-600">
            <Link href="/admin/products/add" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-black border border-gold-500/20 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex justify-between items-center">
                  <span>Total Sales</span>
                  <div className="rounded-full bg-green-500/10 p-2 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </CardTitle>
                <CardDescription className="text-white/70">Monthly revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">12,345 MAD</div>
                <div className="mt-1 flex items-center text-sm">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">+12%</span>
                  <span className="text-white/70 ml-1">from last month</span>
                </div>
                <div className="mt-4">
                  <Progress value={salesProgress} className="h-1.5 bg-gold-500/10" indicatorClassName="bg-gold-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex justify-between items-center">
                  <span>Orders</span>
                  <div className="rounded-full bg-green-500/10 p-2 text-green-400">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                </CardTitle>
                <CardDescription className="text-white/70">Total orders this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">156</div>
                <div className="mt-1 flex items-center text-sm">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">+8%</span>
                  <span className="text-white/70 ml-1">from last month</span>
                </div>
                <div className="mt-4">
                  <Progress value={ordersProgress} className="h-1.5 bg-gold-500/10" indicatorClassName="bg-gold-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex justify-between items-center">
                  <span>Customers</span>
                  <div className="rounded-full bg-green-500/10 p-2 text-green-400">
                    <Users className="h-4 w-4" />
                  </div>
                </CardTitle>
                <CardDescription className="text-white/70">Active customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">1,234</div>
                <div className="mt-1 flex items-center text-sm">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">+22%</span>
                  <span className="text-white/70 ml-1">from last month</span>
                </div>
                <div className="mt-4">
                  <Progress
                    value={customersProgress}
                    className="h-1.5 bg-gold-500/10"
                    indicatorClassName="bg-gold-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex justify-between items-center">
                  <span>Conversion</span>
                  <div className="rounded-full bg-red-500/10 p-2 text-red-400">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                </CardTitle>
                <CardDescription className="text-white/70">Visitor to customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">2.74%</div>
                <div className="mt-1 flex items-center text-sm">
                  <TrendingDown className="mr-1 h-4 w-4 text-red-400" />
                  <span className="text-red-400 font-medium">-0.5%</span>
                  <span className="text-white/70 ml-1">from last month</span>
                </div>
                <div className="mt-4">
                  <Progress value={45} className="h-1.5 bg-gold-500/10" indicatorClassName="bg-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-black/30 border-gold-500/20 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Recent Orders</CardTitle>
                <CardDescription className="text-white/70">Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold-500/20">
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-500/10">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gold-500/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === "Completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : order.status === "Processing"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-amber-500/20 text-amber-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gold-500/20 bg-black/20">
                <Link href="/admin/orders" className="text-sm text-gold-500 hover:text-gold-400 flex items-center">
                  View all orders
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black/30 border-gold-500/20 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Popular Products</CardTitle>
                <CardDescription className="text-white/70">Best selling items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {popularProducts.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gold-500/30">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-white">{product.name}</h3>
                        <p className="text-xs text-white/70">{product.category}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{product.price}</span>
                          <div className="flex items-center text-xs text-white/70">
                            <Eye className="mr-1 h-3 w-3" />
                            {product.sold} sold
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gold-500/20 bg-black/20">
                <Link href="/admin/products" className="text-sm text-gold-500 hover:text-gold-400 flex items-center">
                  View all products
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg flex justify-between items-center">
                  <span>Revenue</span>
                  <BarChart3 className="h-4 w-4 text-gold-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] w-full flex items-center justify-center">
                  <div className="relative h-full w-full">
                    {/* Simulated chart bars */}
                    <div
                      className="absolute bottom-0 left-[5%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "65%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[15%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "40%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[25%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "75%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[35%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "50%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[45%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "85%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[55%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[65%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "90%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[75%] w-[8%] bg-gold-500/80 rounded-t-sm"
                      style={{ height: "70%" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-[85%] w-[8%] bg-gold-500 rounded-t-sm"
                      style={{ height: "78%" }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-white/70">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">Bags</span>
                      <span className="text-sm text-white/70">45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-gold-500/10" indicatorClassName="bg-gold-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">Home Decor</span>
                      <span className="text-sm text-white/70">30%</span>
                    </div>
                    <Progress value={30} className="h-2 bg-gold-500/10" indicatorClassName="bg-gold-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">Accessories</span>
                      <span className="text-sm text-white/70">15%</span>
                    </div>
                    <Progress value={15} className="h-2 bg-gold-500/10" indicatorClassName="bg-gold-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">Textiles</span>
                      <span className="text-sm text-white/70">10%</span>
                    </div>
                    <Progress value={10} className="h-2 bg-gold-500/10" indicatorClassName="bg-gold-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-gold-500/10 text-white hover:bg-gold-500/20 h-auto py-4 flex flex-col items-center justify-center">
                    <Package className="h-6 w-6 mb-2" />
                    <span>Add Product</span>
                  </Button>
                  <Button className="bg-gold-500/10 text-white hover:bg-gold-500/20 h-auto py-4 flex flex-col items-center justify-center">
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    <span>Orders</span>
                  </Button>
                  <Button className="bg-gold-500/10 text-white hover:bg-gold-500/20 h-auto py-4 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Customers</span>
                  </Button>
                  <Button className="bg-gold-500/10 text-white hover:bg-gold-500/20 h-auto py-4 flex flex-col items-center justify-center">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-black/30 border-gold-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Analytics Dashboard</CardTitle>
              <CardDescription className="text-white/70">Detailed metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center border border-gold-500/20 rounded-md">
                <p className="text-white/70">Analytics charts and data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-black/30 border-gold-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Reports</CardTitle>
              <CardDescription className="text-white/70">Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center border border-gold-500/20 rounded-md">
                <p className="text-white/70">Reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const recentOrders = [
  { id: "7892", customer: "Sarah Johnson", date: "May 14, 2025", amount: "1,200 MAD", status: "Completed" },
  { id: "7891", customer: "Michael Brown", date: "May 13, 2025", amount: "850 MAD", status: "Processing" },
  { id: "7890", customer: "Emma Wilson", date: "May 12, 2025", amount: "2,100 MAD", status: "Completed" },
  { id: "7889", customer: "James Taylor", date: "May 11, 2025", amount: "950 MAD", status: "Shipped" },
]

const popularProducts = [
  {
    id: 1,
    name: "Handcrafted Leather Tote",
    category: "Bags",
    price: "1,200 MAD",
    sold: 24,
    image: "/images/product-1.png",
  },
  {
    id: 2,
    name: "Embroidered Clutch",
    category: "Accessories",
    price: "850 MAD",
    sold: 18,
    image: "/images/product-2.png",
  },
  {
    id: 3,
    name: "Moroccan Leather Pouf",
    category: "Home Decor",
    price: "1,500 MAD",
    sold: 15,
    image: "/images/product-3.png",
  },
]
