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
        className="h-full relative"
        data-testid="integration-card"
      >
        <Card className="h-full flex flex-col relative overflow-hidden transition-all duration-300">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent to-[#1C75BC] opacity-0 hover:opacity-20 z-0 pointer-events-none"
            initial={{ scale: 0.8 }}
            whileHover={{
              scale: 1.2,
              opacity: 0.3,
              transition: { duration: 0.3 }
            }}
            style={{
              originX: 0,
              originY: 0,
            }}
          />
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
