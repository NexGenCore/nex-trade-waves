"use client"

import Loader from "@/components/loader"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Loader fullscreen />
    </div>
  )
}