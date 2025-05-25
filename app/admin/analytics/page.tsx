import type React from "react"
import { BarChart3, TrendingUp, Users, ShoppingBag } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-2 text-white/70">View your store's performance metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Sales"
          value="12,345 MAD"
          change="+12%"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <AnalyticsCard title="Visitors" value="5,678" change="+8%" trend="up" icon={<Users className="h-5 w-5" />} />
        <AnalyticsCard title="Orders" value="156" change="+15%" trend="up" icon={<ShoppingBag className="h-5 w-5" />} />
        <AnalyticsCard
          title="Conversion Rate"
          value="2.74%"
          change="-0.5%"
          trend="down"
          icon={<BarChart3 className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
          <h2 className="mb-4 text-lg font-medium text-white">Sales Overview</h2>
          <div className="aspect-[2/1] w-full rounded-md bg-black/50 flex items-center justify-center">
            <p className="text-white/50">Sales chart will be displayed here</p>
          </div>
        </div>

        <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
          <h2 className="mb-4 text-lg font-medium text-white">Traffic Sources</h2>
          <div className="aspect-[2/1] w-full rounded-md bg-black/50 flex items-center justify-center">
            <p className="text-white/50">Traffic sources chart will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-gold-500/20 bg-black/30 p-6">
        <h2 className="mb-4 text-lg font-medium text-white">Product Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-500/20">
                <th className="pb-3 text-left text-sm font-medium text-white/70">Product</th>
                <th className="pb-3 text-left text-sm font-medium text-white/70">Views</th>
                <th className="pb-3 text-left text-sm font-medium text-white/70">Sales</th>
                <th className="pb-3 text-left text-sm font-medium text-white/70">Revenue</th>
                <th className="pb-3 text-left text-sm font-medium text-white/70">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gold-500/10">
                  <td className="py-3 text-white">Product {i}</td>
                  <td className="py-3 text-white">{Math.floor(Math.random() * 1000)}</td>
                  <td className="py-3 text-white">{Math.floor(Math.random() * 100)}</td>
                  <td className="py-3 text-white">{Math.floor(Math.random() * 10000)} MAD</td>
                  <td className="py-3 text-white">{(Math.random() * 10).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AnalyticsCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
      <div className="flex items-center">
        <div className="rounded-full bg-gold-500/10 p-3 text-gold-500">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className={`text-xs ${trend === "up" ? "text-green-400" : "text-red-400"}`}>{change} from last month</p>
        </div>
      </div>
    </div>
  )
}
