import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-white/70">Manage your store settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-black">
          <TabsTrigger value="general" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            General
          </TabsTrigger>
          <TabsTrigger value="shipping" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Shipping
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Payment
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
            <h2 className="text-lg font-medium text-white">Store Information</h2>
            <p className="mt-1 text-sm text-white/70">Update your store details</p>

            <div className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name" className="text-white">
                    Store Name
                  </Label>
                  <Input
                    id="store-name"
                    defaultValue="ARTIZANA MARRAKECH"
                    className="border-gold-500/30 bg-black/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email" className="text-white">
                    Store Email
                  </Label>
                  <Input
                    id="store-email"
                    type="email"
                    defaultValue="info@artizanamarrakech.com"
                    className="border-gold-500/30 bg-black/50 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-description" className="text-white">
                  Store Description
                </Label>
                <Textarea
                  id="store-description"
                  defaultValue="Luxury artisanal goods inspired by Moroccan heritage and crafted with passion in the heart of Marrakech."
                  className="min-h-32 border-gold-500/30 bg-black/50 text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="store-phone"
                    defaultValue="+212 5 00 00 00 00"
                    className="border-gold-500/30 bg-black/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-currency" className="text-white">
                    Currency
                  </Label>
                  <Input id="store-currency" defaultValue="MAD" className="border-gold-500/30 bg-black/50 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-address" className="text-white">
                  Store Address
                </Label>
                <Textarea
                  id="store-address"
                  defaultValue="123 Rue des Artisans, Medina, Marrakech, Morocco"
                  className="min-h-20 border-gold-500/30 bg-black/50 text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-black hover:bg-gold-600">Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
            <h2 className="text-lg font-medium text-white">Shipping Settings</h2>
            <p className="mt-1 text-sm text-white/70">Configure your shipping options</p>

            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="shipping-domestic" defaultChecked />
                  <label htmlFor="shipping-domestic" className="text-sm text-white">
                    Enable Domestic Shipping
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="shipping-international" defaultChecked />
                  <label htmlFor="shipping-international" className="text-sm text-white">
                    Enable International Shipping
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="shipping-free" />
                  <label htmlFor="shipping-free" className="text-sm text-white">
                    Enable Free Shipping for Orders Above Threshold
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="shipping-domestic-rate" className="text-white">
                    Domestic Shipping Rate (MAD)
                  </Label>
                  <Input
                    id="shipping-domestic-rate"
                    type="number"
                    defaultValue="50"
                    className="border-gold-500/30 bg-black/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping-international-rate" className="text-white">
                    International Shipping Rate (MAD)
                  </Label>
                  <Input
                    id="shipping-international-rate"
                    type="number"
                    defaultValue="200"
                    className="border-gold-500/30 bg-black/50 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipping-free-threshold" className="text-white">
                  Free Shipping Threshold (MAD)
                </Label>
                <Input
                  id="shipping-free-threshold"
                  type="number"
                  defaultValue="1000"
                  className="border-gold-500/30 bg-black/50 text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-black hover:bg-gold-600">Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
            <h2 className="text-lg font-medium text-white">Payment Settings</h2>
            <p className="mt-1 text-sm text-white/70">Configure your payment options</p>

            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="payment-credit-card" defaultChecked />
                  <label htmlFor="payment-credit-card" className="text-sm text-white">
                    Accept Credit Card Payments
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="payment-paypal" defaultChecked />
                  <label htmlFor="payment-paypal" className="text-sm text-white">
                    Accept PayPal
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="payment-bank-transfer" />
                  <label htmlFor="payment-bank-transfer" className="text-sm text-white">
                    Accept Bank Transfers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="payment-cash" />
                  <label htmlFor="payment-cash" className="text-sm text-white">
                    Accept Cash on Delivery
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-api-key" className="text-white">
                  Payment Gateway API Key
                </Label>
                <Input
                  id="payment-api-key"
                  type="password"
                  defaultValue="sk_test_123456789"
                  className="border-gold-500/30 bg-black/50 text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-black hover:bg-gold-600">Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
            <h2 className="text-lg font-medium text-white">Notification Settings</h2>
            <p className="mt-1 text-sm text-white/70">Configure your notification preferences</p>

            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-new-order" defaultChecked />
                  <label htmlFor="notify-new-order" className="text-sm text-white">
                    New Order Notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-low-stock" defaultChecked />
                  <label htmlFor="notify-low-stock" className="text-sm text-white">
                    Low Stock Alerts
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-customer-message" defaultChecked />
                  <label htmlFor="notify-customer-message" className="text-sm text-white">
                    Customer Message Notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-product-review" />
                  <label htmlFor="notify-product-review" className="text-sm text-white">
                    Product Review Notifications
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email" className="text-white">
                  Notification Email
                </Label>
                <Input
                  id="notification-email"
                  type="email"
                  defaultValue="admin@artizanamarrakech.com"
                  className="border-gold-500/30 bg-black/50 text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-gold-500 text-black hover:bg-gold-600">Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
