export function calculateSUM(managedSpend: number, totalSpend: number): number {
  if (totalSpend === 0) return 0;
  return (managedSpend / totalSpend) * 100;
}
// 2
/**
 *   ROI (Return on Investment)
 * @param gainFromInvestment  
 * @param costOfInvestment 
 * @returns ROI  
 */
function calculateROI(gainFromInvestment: number, costOfInvestment: number): number {
  if (costOfInvestment === 0) return 0;  
  const roi = ((gainFromInvestment - costOfInvestment) / costOfInvestment) * 100;
  return roi;
}

 
const gain = 12500;
const cost = 10000;

const roi = calculateROI(gain, cost);
console.log(`ROI: ${roi.toFixed(2)}%`); // ROI: 25.00%

// 3

function calculateCostSaving(previousCost: number, currentCost: number): number {
  if (previousCost === 0) return 0;
  return ((previousCost - currentCost) / previousCost) * 100;
}

const previousCost = 50000;
const currentCost = 42000;
const saving = calculateCostSaving(previousCost, currentCost);
console.log(`Cost Saving: ${saving.toFixed(2)}%`);

//  4
function calculateCostReduction(previousCost: number, currentCost: number): number {
  if (previousCost === 0) return 0
  return ((previousCost - currentCost) / previousCost) * 100
}

// 5
//  Cost Avoidance
function calculateCostAvoidance(data:any) {
  const costAvoided = data.potentialCost - data.actualCost;
  const avoidancePercentage = (costAvoided / data.potentialCost) * 100;

  return {
    projectName: data.projectName,
    costAvoided,
    avoidancePercentage: Number(avoidancePercentage.toFixed(2))  
  };
}

// 6 
function tcoSaving(
  capexPurchase: number,
  opex5yr: number,
  avgBidCapex: number,
  opex5yrBid: number
): number {
  const actualTco = capexPurchase + opex5yr;
  const bidTco = avgBidCapex + opex5yrBid;
  return actualTco - bidTco;
}

const capexPurchase = 500000;
const opex5yr = 200000;
const avgBidCapex = 450000;
const opex5yrBid = 180000;

const saving2 = tcoSaving(capexPurchase, opex5yr, avgBidCapex, opex5yrBid);

console.log(`TCO Saving (Internal): $${saving}`);

// 7 
function tcoSavingPercentage(
  capexPurchase: number,
  opex5yr: number,
  avgBidCapex: number,
  opex5yrBid: number
): number {
  const actualTco = capexPurchase + opex5yr;
  const bidTco = avgBidCapex + opex5yrBid;

  if (actualTco === 0) {
    throw new Error("Actual TCO cannot be zero");
  }

  return ((actualTco - bidTco) / actualTco) * 100;
}

//  TCO Saving (Outsource) 8
function tcoSavingOutsource(inhouseCost: number, outsourcedCost: number): number {
  return inhouseCost - outsourcedCost;
}

const saving3 = tcoSavingOutsource(100000, 75000);
console.log("TCO Saving (Outsource):", saving); // 25000


// 9

//  Maverick Spend Rate
function maverickSpendRate(maverickSpend: number, totalSpend: number): number {
  if (totalSpend === 0) return 0;  
  return (maverickSpend / totalSpend) * 100;
}

const result = maverickSpendRate(50000, 200000);
console.log(result.toFixed(2) + "%"); // 25.00%


// 10

//  Rate of Emergency Purchase
function emergencyPurchaseRate(emergencyPurchases: number, totalPurchases: number): number {
  if (totalPurchases === 0) return 0; 
  return (emergencyPurchases / totalPurchases) * 100;
}

const result2 = emergencyPurchaseRate(25, 500);
console.log(result.toFixed(2) + "%"); // 5.00%

