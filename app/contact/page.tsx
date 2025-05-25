import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
         <Image
          src="/images/LOGO1.png"
          alt="Logo top-left"
          width={200}
          height={80}
          className="absolute top-4 left-4 opacity-90 z-10"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-4xl font-light tracking-wider text-white sm:text-5xl">Contact Us</h1>
          <div className="mt-4 flex items-center text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span>Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-stone-800">Get in Touch</h2>
              <div className="mt-2 h-0.5 w-24 bg-gold-500"></div>
              <p className="mt-6 text-stone-600 leading-relaxed">
                We'd love to hear from you. Whether you have a question about our products, custom orders, or anything
                else, our team is ready to assist you.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-gold-500" />
                  <div>
                    <h3 className="font-medium text-stone-800">Visit Our Atelier</h3>
                    <address className="mt-1 not-italic text-stone-600">
                      123 Rue des Artisans
                      <br />
                      Medina, Marrakech
                      <br />
                      Morocco
                    </address>
                    <p className="mt-1 text-stone-600">Open Monday to Saturday, 10am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium text-stone-800">Email Us</h3>
                    <p className="mt-1 text-stone-600">
                      <a href="mailto:info@artizanamarrakech.com" className="hover:text-amber-700">
                        info@artizanamarrakech.com
                      </a>
                    </p>
                    <p className="mt-1 text-stone-600">We aim to respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-amber-700" />
                  <div>
                    <h3 className="font-medium text-stone-800">Call Us</h3>
                    <p className="mt-1 text-stone-600">
                      <a href="tel:+212500000000" className="hover:text-amber-700">
                        +212 5 00 00 00 00
                      </a>
                    </p>
                    <p className="mt-1 text-stone-600">Available Monday to Friday, 9am - 5pm (GMT+1)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="rounded-lg bg-black p-8 shadow-lg border border-gold-500/30">
                <h3 className="font-serif text-2xl font-light text-white">Send Us a Message</h3>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className="mt-1 w-full rounded-md border border-gold-500/30 bg-black/50 px-4 py-2 text-white focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className="mt-1 w-full rounded-md border border-gold-500/30 bg-black/50 px-4 py-2 text-white focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 w-full rounded-md border border-gold-500/30 bg-black/50 px-4 py-2 text-white focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="mt-1 w-full rounded-md border border-gold-500/30 bg-black/50 px-4 py-2 text-white focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="mt-1 w-full rounded-md border border-gold-500/30 bg-black/50 px-4 py-2 text-white focus:border-gold-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gold-500 text-black hover:bg-gold-600" size="lg">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-black py-20 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-white">Find Us</h2>
          <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <div className="h-full w-full bg-stone-200">
              {/* This would be replaced with an actual map component */}
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-stone-600">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
