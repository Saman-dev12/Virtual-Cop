"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import type { ComplaintFormData } from "../complaint-form"

interface LocationStepProps {
  formData: ComplaintFormData
  updateFormData: (data: Partial<ComplaintFormData>) => void
  errors: Record<string, string>
  nextStep: () => void
  prevStep: () => void
}

export default function LocationStep({ formData, updateFormData, errors, nextStep, prevStep }: LocationStepProps) {
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ location: e.target.value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Step 2: Location</h2>
        <p className="text-gray-600 mb-6">Please provide the location where the incident occurred</p>

        <div className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base">
              Address or Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="location"
                placeholder="Enter address, city, or location details"
                value={formData.location}
                onChange={handleLocationChange}
                className="pl-10 py-6 text-base"
              />
            </div>
            {errors.location && <p className="text-red-500 mt-1 text-sm">{errors.location}</p>}
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
