"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

import TypeStep from "./steps/type-step"
import LocationStep from "./steps/location-step"
import EvidenceStep from "./steps/evidence-step"
import ContactStep from "./steps/contact-step"
import ReviewStep from "./steps/review-step"
import StepIndicator from "./step-indicator"
import { toast } from "sonner"

// Form validation schema
const complaintSchema = z.object({
  type: z.string().min(1, "Please select a complaint type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  images: z.array(z.string()).optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
})

export type ComplaintFormData = {
  type: string
  description: string
  location: string
  images: string[]
  email: string
  phone: string
  status: string
}

export default function ComplaintForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ComplaintFormData>({
    type: "",
    description: "",
    location: "",
    images: [],
    email: "",
    phone: "",
    status: "pending",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (data: Partial<ComplaintFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          complaintSchema.pick({ type: true, description: true }).parse(formData)
          break
        case 2:
          complaintSchema.pick({ location: true }).parse(formData)
          break
        case 3:
          // No validation needed for images
          return true
        case 4:
          complaintSchema.pick({ email: true, phone: true }).parse(formData)
          break
        default:
          return true
      }
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Validate the entire form
      complaintSchema.parse(formData)

      console.log(formData)
      const response = await fetch("http://localhost:8000/api/complaint/submitComplaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit complaint")
      }

      toast.success("Complaint submitted successfully!")
      router.push("/success")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        console.error("Submission error:", error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Register New Complaint</h1>
        <p className="text-gray-600">
          Please provide the details of your complaint. All information will be stored securely.
        </p>
      </div>

      <div className="p-8">
        <div className="mb-10 px-4">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div className="mt-8">
          {currentStep === 1 && (
            <TypeStep formData={formData} updateFormData={updateFormData} errors={errors} nextStep={nextStep} />
          )}

          {currentStep === 2 && (
            <LocationStep
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 3 && (
            <EvidenceStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 4 && (
            <ContactStep
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 5 && (
            <ReviewStep
              formData={formData}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}
