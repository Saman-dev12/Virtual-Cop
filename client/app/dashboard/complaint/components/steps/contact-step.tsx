"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone } from "lucide-react"
import type { ComplaintFormData } from "../complaint-form"

interface ContactStepProps {
  formData: ComplaintFormData
  updateFormData: (data: Partial<ComplaintFormData>) => void
  errors: Record<string, string>
  nextStep: () => void
  prevStep: () => void
}

export default function ContactStep({ formData, updateFormData, errors, nextStep, prevStep }: ContactStepProps) {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ email: e.target.value })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ phone: e.target.value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Step 4: Contact Information</h2>
        <p className="text-gray-600 mb-6">Please provide your contact details so we can follow up on your complaint</p>

        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleEmailChange}
                className="pl-10 py-6 text-base"
              />
            </div>
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="pl-10 py-6 text-base"
              />
            </div>
            {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} className="px-6 py-2">
          Previous Step
        </Button>
        <Button onClick={nextStep} className="px-6 py-2 bg-green-600 hover:bg-green-700">
          Next Step
        </Button>
      </div>
    </div>
  )
}
