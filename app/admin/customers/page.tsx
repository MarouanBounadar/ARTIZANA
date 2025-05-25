import { Search, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CustomersPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Customers</h1>
        <p className="mt-2 text-white/70">Manage your customer accounts</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input placeholder="Search customers..." className="pl-10 border-gold-500/30 bg-black/50 text-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gold-500/20 bg-black/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-500/20">
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Orders</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Total Spent</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Last Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gold-500/10">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gold-500/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-gold-500">{customer.name.charAt(0)}</span>
                      </div>
                      <span className="ml-3 font-medium text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white">{customer.email}</td>
                  <td className="px-4 py-4 text-white">{customer.orders}</td>
                  <td className="px-4 py-4 text-white">{customer.totalSpent}</td>
                  <td className="px-4 py-4 text-white/70">{customer.lastOrder}</td>
                  <td className="px-4 py-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gold-500/20 px-4 py-4">
          <p className="text-sm text-white/70">Showing 1-8 of 24 customers</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="border-gold-500/30 text-white hover:bg-gold-500/10" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-gold-500/30 text-white hover:bg-gold-500/10">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    orders: 5,
    totalSpent: "4,250 MAD",
    lastOrder: "May 12, 2025",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    orders: 3,
    totalSpent: "2,800 MAD",
    lastOrder: "May 10, 2025",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    orders: 7,
    totalSpent: "6,100 MAD",
    lastOrder: "May 8, 2025",
  },
  {
    id: 4,
    name: "James Taylor",
    email: "james.taylor@example.com",
    orders: 2,
    totalSpent: "1,950 MAD",
    lastOrder: "May 5, 2025",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    orders: 4,
    totalSpent: "3,700 MAD",
    lastOrder: "May 3, 2025",
  },
  {
    id: 6,
    name: "William Davis",
    email: "william.davis@example.com",
    orders: 1,
    totalSpent: "850 MAD",
    lastOrder: "April 29, 2025",
  },
  {
    id: 7,
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@example.com",
    orders: 6,
    totalSpent: "5,200 MAD",
    lastOrder: "April 25, 2025",
  },
  {
    id: 8,
    name: "Benjamin Lee",
    email: "benjamin.lee@example.com",
    orders: 3,
    totalSpent: "2,450 MAD",
    lastOrder: "April 22, 2025",
  },
]
