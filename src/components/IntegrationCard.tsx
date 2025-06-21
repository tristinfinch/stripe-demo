"use client"
import * as React from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Badge } from "./ui/badge"
import Link from "next/link"

export interface IntegrationCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  status?: "active" | "beta" | "coming-soon"
}

export function IntegrationCard({
  title,
  description,
  href,
  icon,
  status = "active",
}: IntegrationCardProps) {
  return (
    <Link href={href} passHref>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col hover:bg-gray-50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle data-testid="card-title">{title}</CardTitle>
              <div className="text-2xl">{icon}</div>
            </div>
            {status !== "active" && (
              <Badge variant={status === "beta" ? "secondary" : "outline"} data-testid="status-badge">
                {status === "beta" ? "Beta" : "Coming Soon"}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <CardDescription data-testid="card-description">{description}</CardDescription>
          </CardContent>
          <CardFooter className="mt-auto">
            <span className="text-primary">View integration →</span>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
