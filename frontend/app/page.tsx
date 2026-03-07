"use client"

import { useState } from "react"
import { NoesisAuth } from "@/components/noesis/NoesisAuth"
import { NoesisQuiz } from "@/components/noesis/NoesisQuiz"

export default function Page() {
  const [userName, setUserName] = useState<string | null>(null)

  if (!userName) {
    return <NoesisAuth onEnter={(name) => setUserName(name)} />
  }

  return <NoesisQuiz userName={userName} />
}
