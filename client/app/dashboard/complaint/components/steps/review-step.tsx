"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ComplaintFormData } from "../complaint-form"
import { Loader2, Check, MapPin, Mail, Phone, FileText, ImageIcon } from "lucide-react"

interface ReviewStepProps {
  formData: ComplaintFormData
  isSubmitting: boolean
  handleSubmit: () => void
  prevStep: () => void
}

export default function ReviewStep({ formData, isSubmitting, handleSubmit, prevStep }: ReviewStepProps) {
  // Map complaint type IDs to readable labels
  const complaintTypeLabels: Record<string, string> = {
    noise: "Noise Complaint",
    traffic: "Traffic Violation",
    suspicious: "Suspicious Activity",
    harassment: "Harassment",
    vandalism: "Vandalism",
    domestic: "Domestic Dispute",
    theft: "Theft",
    fraud: "Fraud",
    fire: "Fire Emergency",
    public: "Public Disturbance",
    community: "Community Issue",
    other: "Other",
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Step 5: Review</h2>
        <p className="text-gray-600 mb-6">Please review your complaint details before submitting</p>

        <Card className="mb-6 overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h3 className="font-medium text-green-800">Complaint Summary</h3>
          </div>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="px-6 py-4 flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Complaint Type</h4>
                  <p className="mt-1 font-medium">{complaintTypeLabels[formData.type] || formData.type}</p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p className="mt-1 text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="mt-1">{formData.location}</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="mt-1">{formData.email}</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="mt-1">{formData.phone}</p>
                </div>
              </div>

              {formData.images && formData.images.length > 0 && (
                <div className="px-6 py-4 flex items-start gap-3">
                  <ImageIcon className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Evidence ({formData.images.length} images)</h4>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {formData.images.map((url, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-md border border-gray-200 w-20 h-20"
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Evidence ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} className="px-6 py-2">
          Previous Step
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 min-w-[150px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Submit Complaint
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
