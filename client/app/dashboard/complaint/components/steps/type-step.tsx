"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Volume2,
  Car,
  AlertTriangle,
  Shield,
  Trash2,
  Home,
  Briefcase,
  Building2,
  Flame,
  FileText,
  Siren,
  Users,
} from "lucide-react"
import type { ComplaintFormData } from "../complaint-form"

interface TypeStepProps {
  formData: ComplaintFormData
  updateFormData: (data: Partial<ComplaintFormData>) => void
  errors: Record<string, string>
  nextStep: () => void
}

export default function TypeStep({ formData, updateFormData, errors, nextStep }: TypeStepProps) {
  const complaintTypes = [
    { id: "noise", label: "Noise Complaint", icon: Volume2 },
    { id: "traffic", label: "Traffic Violation", icon: Car },
    { id: "suspicious", label: "Suspicious Activity", icon: AlertTriangle },
    { id: "harassment", label: "Harassment", icon: Shield },
    { id: "vandalism", label: "Vandalism", icon: Trash2 },
    { id: "domestic", label: "Domestic Dispute", icon: Home },
    { id: "theft", label: "Theft", icon: Briefcase },
    { id: "fraud", label: "Fraud", icon: Building2 },
    { id: "fire", label: "Fire Emergency", icon: Flame },
    { id: "public", label: "Public Disturbance", icon: Siren },
    { id: "community", label: "Community Issue", icon: Users },
    { id: "other", label: "Other", icon: FileText },
  ]

  const handleTypeSelect = (type: string) => {
    updateFormData({ type })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ description: e.target.value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Step 1: Complaint Type</h2>
        <p className="text-gray-600 mb-6">Select the type of complaint you want to register</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {complaintTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card
                key={type.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  formData.type === type.id ? "border-2 border-green-500 bg-green-50" : "hover:border-green-200"
                }`}
                onClick={() => handleTypeSelect(type.id)}
              >
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <div
                    className={`p-3 rounded-full mb-3 ${formData.type === type.id ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    <Icon className={`h-6 w-6 ${formData.type === type.id ? "text-green-600" : "text-gray-600"}`} />
                  </div>
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              </Card>
            )
          })}
        </div>
        {errors.type && <p className="text-red-500 mt-2 text-sm">{errors.type}</p>}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Brief Description</h3>
        <Textarea
          placeholder="Please describe the issue in detail"
          className="min-h-[150px] resize-none"
          value={formData.description}
          onChange={handleDescriptionChange}
        />
        {errors.description && <p className="text-red-500 mt-2 text-sm">{errors.description}</p>}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={nextStep} className="px-6 py-2 bg-green-600 hover:bg-green-700">
          Next Step
        </Button>
      </div>
    </div>
  )
}
