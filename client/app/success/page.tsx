import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-10">
        <div className="p-4 bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Complaint Submitted Successfully</h1>
        <p className="text-gray-600 mb-8">
          Thank you for submitting your complaint. We have received your information and will review it shortly. You
          will receive a confirmation email with your complaint reference number.
        </p>
        <Link href="/">
          <Button className="px-6 py-2 bg-green-600 hover:bg-green-700">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
