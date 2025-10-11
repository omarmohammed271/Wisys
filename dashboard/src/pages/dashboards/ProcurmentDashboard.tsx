'use client';

import StatsCard from "@/components/Cards/StatsCards";
import * as React from 'react';
import ProcurementFunnel from '@/components/Charts/ProcurementDshboardCharts/ProcurementFunnel';
import RequestToPODonut from '@/components/Charts/ProcurementDshboardCharts/RequestToPODonut';
import POVsReceiptsBar from '@/components/Charts/ProcurementDshboardCharts/POVsReceiptsBar';
import ReceiptsVsInvoicesStacked from '@/components/Charts/ProcurementDshboardCharts/ReceiptsVsInvoicesStacked';
import DeliveryDelaysBar from '@/components/Charts/ProcurementDshboardCharts/DeliveryDelaysBar';
import OverUnderScatter from '@/components/Charts/ProcurementDshboardCharts/OverUnderScatter';
import InvoicePaymentStatusBar from '@/components/Charts/ProcurementDshboardCharts/InvoicePaymentStatusBar';
import PaymentLeadTimeLine from '@/components/Charts/ProcurementDshboardCharts/PaymentLeadTimeLine';
import { FileText, ShoppingCart, ArrowUpRight, Package, CreditCard, File } from 'lucide-react';
import TopVendorsBySpend from '@/components/Charts/ProcurementDshboardCharts/TopVendorsBySpend';
import VendorPerformanceRadar from '@/components/Charts/ProcurementDshboardCharts/VendorPerformance';
import Chatbot from '@/components/AIOverlay/Chatbot';
import MLOverlay from '@/components/AIOverlay/MLOverlay';


// Chatbot Questions
const chatbotQuestions = [
  "Total Purchase Requests",
  "Approved Purchase Orders",
  "Request → PO Conversion",
  "Receipts vs POs",
  "Total A/P Invoices",
  "Fully Paid Invoices",
  "Top Vendor by Spend",
  "Vendor Performance",
  "Delivery Delays",
  "Invoice Payment Status",
];

const chatbotAnswers: Record<string, string> = {
  "total purchase requests": "Currently, there are 128 purchase requests in the system.",
  "approved purchase orders": "112 purchase orders have been approved so far.",
  "request → po conversion": "The Request to PO conversion rate is 87%.",
  "receipts vs pos": "The current receipt rate vs POs is 95%.",
  "total a/p invoices": "There are 65 accounts payable invoices recorded.",
  "fully paid invoices": "50 invoices have been fully paid.",
  "top vendor by spend": "Vendor A is the top vendor with a total spend of $15,000.",
  "vendor performance": "Vendor A: Fulfillment 95%, Avg Delivery 4 days, Price Variance 2%. Vendor B: Fulfillment 88%, Avg Delivery 6 days, Price Variance -1%.",
  "delivery delays": "Vendor B has the highest delivery delay at 10 days.",
  "invoice payment status": "Fully Paid: 50, Partially Paid: 20, Unpaid: 10 over the last 5 months.",
};

// MLOverlay Questions
const mlQuestions = [
  "Total Purchase Requests",
  "Approved Purchase Orders",
  "Request → PO Conversion",
  "Receipts vs POs",
  "Total A/P Invoices",
  "Fully Paid Invoices",
  "Top Vendor by Spend",
  "Vendor Performance",
  "Delivery Delays",
  "Invoice Payment Status",
];

const mlAnswers: Record<string, string> = {
  "total purchase requests": "Predicted total purchase requests for next month: 135",
  "approved purchase orders": "Predicted approved POs: 118",
  "request → po conversion": "Predicted Request → PO conversion rate: 89%",
  "receipts vs pos": "Predicted receipts vs POs rate: 96%",
  "total a/p invoices": "Predicted total A/P invoices: 70",
  "fully paid invoices": "Predicted fully paid invoices: 55",
  "top vendor by spend": "Predicted top vendor next month: Vendor A with $16,000 spend",
  "vendor performance": "Predicted vendor performance: Vendor A: Fulfillment 96%, Avg Delivery 4 days",
  "delivery delays": "Predicted highest delivery delay: Vendor B, 9 days",
  "invoice payment status": "Predicted: Fully Paid 55, Partially Paid 18, Unpaid 12",
};


export default function ProcurementDashboard() {
  return (
    <div className="p-3 flex flex-col h-full space-y-2">
      {/* ── Stat Cards ── */}
      <div className="grid h-fit grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-2">

        <StatsCard
          className="border border-border h-full p-4 rounded-2xl"
          title="Total Purchase Requests"
          value={128} // Replace with dynamic OPRQ count
          icon={<FileText className={`size-[90%]`}/>} 
        />

        <StatsCard
          className="border border-border h-full p-4 rounded-2xl"
          title="Approved Purchase Orders"
          value={112} // Replace with dynamic OPOR count
          icon={<ShoppingCart />} 
        />

        <StatsCard
          className="border border-border h-full p-4 rounded-2xl"
          title="Request → PO Conversion"
          value="87%" // Calculate: OPOR / OPRQ * 100
          icon={<ArrowUpRight />} 
        />

        <StatsCard
          className="border border-border h-full p-4 rounded-2xl"
          title="Receipts vs POs"
          value="95%" // Calculate: PDN1 / POR1 * 100
          icon={<Package />} 
        />

        <StatsCard
          className="border border-border h-full p-4 rounded-2xl"
          title="Total A/P Invoices"
          value={65} // Replace with dynamic OPCH count
          icon={<File />} 
        />

        <StatsCard
          className="border border-border h-full p-4 rounded-2xl"
          title="Fully Paid Invoices"
          value="50" // OVPM fully paid count
          icon={<CreditCard />} 
        />

      </div>

      {/* Charts Section */}
      <div className="space-y-2 md:grid flex-1 grid-cols-1 min-[2400px]:max-h-[85.5vh] *:*:h-[500px] *:*:xl:h-1/2 md:grid-cols-2 xl:grid-cols-5 gap-2">
        {/* Upper */}
        <div className=" flex flex-col space-y-2 col-span-1">
          <ProcurementFunnel data={{ OPRQ: 120, OPOR: 100, OPDN: 80, OPCH: 65, OVPM: 50 }} />
          <RequestToPODonut requests={120} purchaseOrders={95} />
        </div>
        <div className=" flex flex-col space-y-2 col-span-1">
          <POVsReceiptsBar 
            categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            ordered={[1200, 1500, 1100, 1800, 2000, 1700]}
            received={[950, 1400, 1050, 1600, 1850, 1500]}
          />
          <DeliveryDelaysBar
            vendors={["Vendor A", "Vendor B", "Vendor C", "Vendor D"]}
            delays={[5, 8, 3, 10]}
          />
        </div>
        <div className=" flex flex-col space-y-2 col-span-1">
          <ReceiptsVsInvoicesStacked
            categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            receipts={[1000, 1200, 900, 1400, 1600, 1300]}
            invoices={[950, 1100, 1000, 1350, 1700, 1250]}
          />
          <PaymentLeadTimeLine
            months={["Jan", "Feb", "Mar", "Apr", "May"]}
            leadTimes={[12, 15, 10, 18, 14]}
          />

        </div>
        <div className=" flex flex-col gap-y-2 col-span-1">
          <OverUnderScatter
            vendors={["Vendor A", "Vendor B", "Vendor C", "Vendor D"]}
            ordered={[100, 150, 120, 200]}
            received={[90, 160, 110, 180]}
          />
          <InvoicePaymentStatusBar
            months={["Jan", "Feb", "Mar", "Apr", "May"]}
            fullyPaid={[50, 70, 60, 80, 90]}
            partiallyPaid={[20, 15, 25, 10, 5]}
            unpaid={[10, 5, 15, 20, 8]}
          />
        </div>
        <div className='md:flex mb-2 justify-center xl:flex-col max-xl:space-x-2 space-y-2 col-span-2 xl:col-span-1 p-2 bg-gradient-to-br border-border from-primary/10 to-secondary/10 border rounded-xl '>
          <TopVendorsBySpend
            vendors={[
              { vendorName: 'Vendor A', totalSpend: 15000, paidAmount: 12000, unpaidAmount: 3000 },
              { vendorName: 'Vendor B', totalSpend: 13000, paidAmount: 9000, unpaidAmount: 4000 },
              { vendorName: 'Vendor C', totalSpend: 11000, paidAmount: 11000, unpaidAmount: 0 },
              { vendorName: 'Vendor D', totalSpend: 9000, paidAmount: 6000, unpaidAmount: 3000 },
              { vendorName: 'Vendor E', totalSpend: 10000, paidAmount: 7000, unpaidAmount: 3000 },
            ]}
            topN={5}
          />
          <VendorPerformanceRadar vendors={[
            { vendorName: 'Vendor A', fulfillmentAccuracy: 95, avgDeliveryTime: 4, priceVariance: 2 },
            { vendorName: 'Vendor B', fulfillmentAccuracy: 88, avgDeliveryTime: 6, priceVariance: -1 },
            { vendorName: 'Vendor C', fulfillmentAccuracy: 92, avgDeliveryTime: 5, priceVariance: 3 },
          ]} />
        </div>
      </div>
      <Chatbot questions={chatbotQuestions} answers={chatbotAnswers} />
      <MLOverlay questions={mlQuestions} answers={mlAnswers} />
    </div>
  );
}
