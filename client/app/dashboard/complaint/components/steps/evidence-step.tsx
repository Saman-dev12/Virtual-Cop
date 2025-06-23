"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X, ImageIcon, Camera } from "lucide-react"
import type { ComplaintFormData } from "../complaint-form"
import { useDropzone } from "react-dropzone"

interface EvidenceStepProps {
  formData: ComplaintFormData
  updateFormData: (data: Partial<ComplaintFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export default function EvidenceStep({ formData, updateFormData, nextStep, prevStep }: EvidenceStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>(formData.images || [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      handleFilesAdded(acceptedFiles)
    },
  })

  const handleFilesAdded = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files])

    // Create preview URLs for the uploaded files
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls])

    // In a real app, you would upload these files to a server and get back URLs
    // For this example, we'll just use the object URLs as placeholders
    const newImageUrls = newPreviewUrls.map((url) => url)
    updateFormData({ images: [...(formData.images || []), ...newImageUrls] })
  }

  const removeFile = (index: number) => {
    // Remove the file from the uploadedFiles array
    const newUploadedFiles = [...uploadedFiles]
    newUploadedFiles.splice(index, 1)
    setUploadedFiles(newUploadedFiles)

    // Remove the preview URL
    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)

    // Update the form data
    updateFormData({ images: newPreviewUrls })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Step 3: Evidence</h2>
        <p className="text-gray-600 mb-6">Upload images or other evidence related to your complaint</p>

        <div className="space-y-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full py-8 border-dashed border-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 hover:border-green-500 transition-all">
                <Camera className="mr-2 h-5 w-5" />
                Click to Upload Evidence
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Evidence</DialogTitle>
              </DialogHeader>
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-md p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input {...getInputProps()} />
                {previewUrls.length === 0 && <div className="flex flex-col items-center justify-center gap-2">
                  <div className="p-4 bg-green-50 rounded-full">
                    <ImageIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Drag and drop images here, or click to select files</p>
                  <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF</p>
                </div>}
                {previewUrls.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Uploaded Evidence</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 aspect-square">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Evidence ${index + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)} className="bg-green-600 hover:bg-green-700">
                  Upload
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {previewUrls.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Uploaded Evidence</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 aspect-square">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Evidence ${index + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
