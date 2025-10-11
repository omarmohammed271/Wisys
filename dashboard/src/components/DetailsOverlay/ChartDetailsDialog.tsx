"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars"

interface ChartDetailsDialogProps {
  /** The element that opens the dialog (e.g. button, icon, etc.) */
  trigger: React.ReactNode

  /** Chart title or section name */
  title: string

  /** Tab content props */
  summary?: React.ReactNode
  dataAndFilters?: React.ReactNode
  insights?: React.ReactNode

  /** Optional styling */
  className?: string
}

export function ChartDetailsDialog({
  trigger,
  title,
  summary,
  dataAndFilters,
  insights,
  className,
}: ChartDetailsDialogProps) {

  const { textScalar } = useResponsiveScalars();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={`sm:max-w-[50vw] h-[60vh] border-border flex flex-col overflow-y-auto bg-gradient-to-br from-background/90 to-accent/80 backdrop-blur-2xl text-foreground p-5 rounded-2xl shadow-xl ${className || ""}`}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold tracking-tight" style={{ fontSize: `${18 * textScalar}px` }}>
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="summary" className="w-full h-full mt-4 overflow-y-auto">
          <TabsList className="grid grid-cols-3 w-full h-fit mb-4">
            <TabsTrigger value="summary" style={{ fontSize: `${15 * textScalar}px` }}>Summary</TabsTrigger>
            <TabsTrigger value="data" style={{ fontSize: `${15 * textScalar}px` }}>Data & Filters</TabsTrigger>
            <TabsTrigger value="insights" style={{ fontSize: `${15 * textScalar}px` }}>Insights</TabsTrigger>
          </TabsList>

          {/* Summary */}
          <TabsContent
            value="summary"
            className="text-sm space-y-2 scale-[0.95] sm:scale-100 overflow-y-auto"
          >
            {summary || <p>No summary available.</p>}
          </TabsContent>

          {/* Data & Filters */}
          <TabsContent
            value="data"
            className="text-sm space-y-2 scale-[0.95] sm:scale-100 overflow-y-auto"
          >
            {dataAndFilters || <p>No data or filters to display.</p>}
          </TabsContent>

          {/* Insights */}
          <TabsContent
            value="insights"
            className="text-sm space-y-2 scale-[0.95] sm:scale-100"
          >
            {insights || <p>No insights available.</p>}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
