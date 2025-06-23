import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, name: "Type" },
    { id: 2, name: "Location" },
    { id: 3, name: "Evidence" },
    { id: 4, name: "Contact" },
    { id: 5, name: "Review" },
  ]

  return (
    <div className="relative">
      {/* Step circles and labels */}
      <div className="flex justify-between items-center">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                currentStep === step.id
                  ? "bg-green-100 text-green-600 border-2 border-green-600"
                  : currentStep > step.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : <span>{step.id}</span>}
            </div>
            <span
              className={`mt-2 text-xs font-medium transition-colors ${
                currentStep === step.id ? "text-green-600" : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Connecting lines */}
      <div className="absolute top-5 left-0 right-0 h-[1px] bg-gray-200 -z-0" />
      <div
        className="absolute top-5 left-0 h-[1px] bg-green-600 -z-0 transition-all"
        style={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
        }}
      />
    </div>
  )
}
