// Content recovered verbatim from the deployed build (nstancioff.github.io/eu-peers-training, July 2026).
// Terminology convention: "service provider" / "project enabler" — never "ESCO".

export const quizM1 = [
  { question: 'A homeowner says: "I can\'t afford to renovate." What is the most effective first response?', options: [
    { text: "Explain the available subsidies", correct: false, feedback: "Subsidies are part of the answer, but jumping to them skips the real question. The homeowner hasn't yet understood renovation as an investment." },
    { text: "Ask what they currently spend on energy per month", correct: true, feedback: 'Exactly. This shifts the conversation from "cost" to "investment." Once they see the current energy cost as money already being spent, the renovation becomes a question of redirecting that spending — not adding new spending.' },
    { text: "Show them the EPC rating of their home", correct: false, feedback: "The EPC is a useful tool, but it's abstract. The homeowner is thinking about money, not letters on a scale. Start where they are." },
    { text: "Tell them their property will lose value without renovation", correct: false, feedback: 'True, but threatening. The "green value" argument works better once the homeowner is already engaged. Leading with fear of loss is rarely the best opening.' },
  ]},
  { question: "Deep renovation typically costs what proportion of a new-build (excluding land)?", options: [
    { text: "About 20%", correct: false, feedback: "Too low. Deep renovation is a major investment, not a minor improvement." },
    { text: "About 50%", correct: true, feedback: "Correct. This is why renovation financing is one of the largest financial decisions a homeowner faces after the original purchase. It's not a repair — it's a reinvestment in the property." },
    { text: "About 75%", correct: false, feedback: "Not quite that high, though it can feel that way to the homeowner. The typical figure is roughly half the cost of equivalent new construction." },
    { text: "About the same", correct: false, feedback: "No — if it were this expensive, the economic case for renovation would collapse entirely." },
  ]},
];

export const fiveWays = [
  { title: "Energy cost reduction", body: "The most immediate and tangible benefit. A well-renovated home can reduce energy consumption by 60–80%. In a context of rising energy prices, this is not just savings — it is insurance against future cost increases." },
  { title: 'Property value — the "green value" effect', body: 'Across European markets, renovated properties with high energy performance ratings command a measurable premium over equivalent unrenovated properties. Conversely, unrenovated properties are beginning to lose value — the "brown discount" is real and growing.' },
  { title: "Marketability and speed of sale", body: "Banks are increasingly reluctant to finance the purchase of unrenovated properties without a renovation plan. A property that cannot be financed cannot be sold easily. Renovation protects liquidity." },
  { title: "Regulatory compliance", body: "Several EU countries now restrict or prohibit renting properties below certain energy performance thresholds. This is not a future risk — it is a present reality in France, the Netherlands, and elsewhere, and the trend is toward stricter standards." },
  { title: "Health and comfort", body: "Thermal renovation improves indoor air quality, reduces damp and mould, and protects against both cold and heat. These benefits reduce healthcare costs and improve quality of life — arguments that matter especially to older homeowners." },
];

export const stakeholders = [
  { name: "The Homeowner", role: "Provides equity, makes the decision", motivation: "Lower bills, comfort, property value, regulatory compliance", constraint: "Limited savings, fear of debt, complexity, lack of time and knowledge", color: "bg-blue-50 border-blue-200" },
  { name: "The State & Public Sector", role: "Sets regulations, distributes subsidies and tax incentives", motivation: "Climate targets, energy independence, social equity, public health", constraint: "Budget limits, political cycles, administrative complexity, competing priorities", color: "bg-violet-50 border-violet-200" },
  { name: "Banks & Lenders", role: "Provide loans to cover costs beyond equity and subsidies", motivation: "Interest income, green asset ratio compliance, market share", constraint: "Counterparty risk (only ~1/3 of households qualify for long-term credit), IT costs, regulatory burden, uncertain profitability", color: "bg-emerald-50 border-emerald-200" },
  { name: "Construction Sector", role: "Delivers the work, determines the price", motivation: "Revenue, workload stability, reputation", constraint: "Labour shortages, material cost volatility, quality control, insurance requirements", color: "bg-orange-50 border-orange-200" },
  { name: "Advisory Services (One-Stop Shops)", role: "Designs the project, assembles the financing, coordinates the process", motivation: "Mission-driven (often publicly funded), professional satisfaction, scale", constraint: "Funding dependency, staffing limits, need to balance technical and financial advice", color: "bg-rose-50 border-rose-200" },
  { name: "Guarantee Mechanisms", role: "Absorbs risk that banks cannot or will not take", motivation: "Expanding access to credit, particularly for lower-income households", constraint: "Requires public capitalisation, emerging instrument in most countries, regulatory frameworks still developing", color: "bg-teal-50 border-teal-200" },
];

export const scenariosM2 = [
  { scenario: "Maria is 68, owns her flat outright, lives on a pension of €900/month. Her building needs a new heating system and insulation. She has €3,000 in savings.", question: "Which stakeholder's constraint is most likely to block this project?", options: [
    { label: "The State", correct: false, why: "Subsidies may be available, but they don't solve the core problem: Maria still needs financing for the remainder, and subsidies often require co-payment." },
    { label: "The Bank", correct: true, why: 'Maria\'s income and age make her ineligible for standard long-term credit under most banking algorithms. This is the "one-third" problem: roughly two-thirds of households cannot access renovation loans. Without a guarantee fund or alternative mechanism, the bank will decline.' },
    { label: "The Construction Sector", correct: false, why: "Construction firms will build whatever is funded. The constraint here is financing, not delivery." },
    { label: "The One-Stop Shop", correct: false, why: "The advisory service can design a good project for Maria, but it cannot solve her credit access problem alone." },
  ]},
  { scenario: "A condominium of 40 flats wants a deep renovation. Owners are a mix of residents and landlords, some wealthy, some on modest incomes. The building needs €1.2M of work.", question: "Which stakeholder dynamic is the biggest challenge here?", options: [
    { label: "Getting the bank to lend €1.2M", correct: false, why: "The total amount is not the issue — the bank would lend to a condominium. The issue is the individual capacity of each owner to service their share of the debt." },
    { label: "Aligning 40 owners with different financial situations", correct: true, why: "Correct. The condominium problem is fundamentally a collective action problem. Wealthy owners can pay their share; lower-income owners cannot. The project stalls unless there is a mechanism to accommodate different financial capacities — a mix of subsidies, loans, and possibly guarantee support for the most vulnerable owners." },
    { label: "Finding a construction company for a job this large", correct: false, why: "A €1.2M project is attractive to construction firms. Finding contractors is not the bottleneck." },
    { label: "Getting regulatory approval", correct: false, why: "Deep renovation is encouraged by regulation, not hindered by it. The obstacle is internal to the ownership group." },
  ]},
];

export const splitIncentives = [
  { title: "Landlord vs. tenant", body: "The landlord pays for the renovation but the tenant benefits from lower energy bills. Alternatively, the landlord renovates and raises the rent — which the tenant may not be able to afford. Neither party has a clean incentive to act without the other's participation." },
  { title: "Multi-apartment buildings", body: "Owners in the same building may have entirely different financial situations and investment priorities. A collective renovation decision requires agreement among all parties — and one dissenting owner can block the whole project. The advisory service must navigate these competing interests, not just the technical solution." },
  { title: "Public vs. private benefit", body: "The public sector benefits from reduced carbon emissions and energy dependence; the homeowner benefits from lower bills and property value. But the costs fall disproportionately on the homeowner. Regulation can resolve this — it is one of the most powerful tools for aligning public and private incentives — but it must be designed carefully to avoid placing impossible burdens on those least able to bear them." },
];

export const bankFronts = [
  { title: "1. Reduce administrative costs", body: "— by having advisory services deliver bank-ready application packages, with verified data, pre-checked compliance, and standardised formats. Connect to the bank's process rather than adding to it." },
  { title: "2. Establish guarantee funds", body: "— publicly capitalised mechanisms that absorb default risk for borrowers who don't meet standard criteria. This drops the bank's provision to zero and unlocks lending to the two-thirds of households currently excluded." },
  { title: "3. Prove taxonomy alignment", body: "— document the energy performance improvement so the bank can claim a reduced capital requirement. This requires data: pre- and post-renovation energy performance, quality verification, and compliance certification." },
  { title: "4. Keep the interest margin workable", body: "— around 1%, which is possible if the other costs are controlled. Soft loans (e.g., zero-interest public loans) can complement commercial lending but should not replace it entirely, or banks will see no reason to participate." },
];

export const regulatoryPush = [
  { title: "The Green Asset Ratio", body: "Banks must disclose the proportion of their lending that aligns with the EU Taxonomy. Renovation loans that can be verified as taxonomy-compatible improve this ratio — giving banks a reputational and regulatory incentive to lend." },
  { title: "Collateral revaluation", body: "Regulators are reviewing how banks value real estate collateral in light of climate risk. Properties exposed to flooding, extreme heat, or poor energy performance may be revalued downward — which means the bank's existing mortgage book is at risk if properties are not renovated." },
  { title: "Green bond eligibility", body: "Banks can securitise renovation loans into green bonds — selling them to institutional investors at favourable rates. But only if the underlying loans meet taxonomy criteria. This creates a direct financial incentive for banks to ensure renovation loans are properly documented." },
];

export const instrumentTiers = [
  { level: "Traditional", color: "bg-blue-50 border-blue-300", cardBg: "bg-blue-50/50",
    description: "Operating for many years across multiple EU countries. Widely known, administratively established, but not always well-adapted to deep renovation or to the needs of One-Stop Shops.",
    keyInsight: "Research shows that traditional instruments scored both highest and lowest on OSS-suitability — the variation is enormous. A well-designed grant programme can be the best tool available; a poorly designed one can actively hinder deep renovation by subsidising shallow interventions.",
    instruments: [
      { name: "Grants and subsidies", howItWorks: "Non-repayable public money allocated to reduce out-of-pocket costs. Usually means-tested and conditional on achieving minimum energy performance improvement.", strengths: "Powerful trigger for action, especially for lower-income households. Can be targeted at vulnerable groups. Familiar and trusted by homeowners.", limitations: "Pressure on public finances and constrained by available budgets. The European Court of Auditors has found that some grant programmes are not cost-effective. Subsidising small, shallow measures can crowd out deeper renovation." },
      { name: "Soft loans (reduced or zero interest)", howItWorks: "The state absorbs part or all of the interest cost. The bank issues the loan at market rates; a public body pays the difference. The borrower repays the principal at little or no interest.", strengths: "Makes debt affordable for middle-income households. Familiar banking channel. Can be combined with grants for lower-income borrowers.", limitations: "Still requires the borrower to qualify for credit — does not solve the access problem for the two-thirds excluded by standard banking criteria." },
      { name: "Tax incentives", howItWorks: "Reduced VAT on renovation works, income tax deductions for renovation spending, property tax relief, or accelerated depreciation for landlords investing in energy improvements.", strengths: "Politically popular. No direct cash outlay from government. Can be targeted at specific property types or renovation depths.", limitations: "Benefits accrue to those with taxable income — least useful for the lowest-income households. The benefit is received after the expenditure, not before, so it does not help with upfront costs." },
    ]},
  { level: "Tested and growing", color: "bg-emerald-50 border-emerald-300", cardBg: "bg-emerald-50/50",
    description: "Implemented in several EU countries with considerable scale, still with potential for broader application. These instruments are tied to energy performance and do not depend entirely on public expenditure.",
    keyInsight: "This tier represents the transition from public dependency to private financing. The instruments here involve third parties — energy companies, service providers, utilities — who either enable financing capacity or deliver contractual energy performance obligations.",
    instruments: [
      { name: "Energy Efficiency Obligations (EEOs)", howItWorks: "Energy companies are required by regulation to achieve energy savings targets. They can meet these by funding efficiency improvements in customers' buildings. The cost is typically socialised across all energy bills.", strengths: "Creates a dedicated funding stream not dependent on annual government budgets. Scale is built into the regulatory mechanism.", limitations: "The cost is socialised — all energy customers pay, including those who cannot afford improvements. The savings claimed may not always correspond to real-world performance." },
      { name: "Energy Performance Contracting (EPC)", howItWorks: "A service provider (project enabler) guarantees a specific level of energy savings after renovation. If savings fall short, the project enabler compensates the difference. The guaranteed savings can secure financing.", strengths: "Shifts performance risk from homeowner to project enabler. The guarantee makes the project bankable. Aligns interests of the renovation provider with the outcome.", limitations: "Most project enablers focus on commercial and public buildings, not residential. Contractual complexity can be daunting for individual homeowners. Deep residential renovation involves more variables than typical commercial projects." },
      { name: "On-bill schemes", howItWorks: "The renovation cost is repaid through the energy bill. The homeowner's bill stays the same or decreases slightly after renovation, with the difference directed to loan repayment.", strengths: "No separate loan application. Repayment tied to the property, not the person. The homeowner sees no increase in monthly outgoings.", limitations: "Requires energy company cooperation. Regulatory frameworks vary. Relatively rare in European residential markets, though the Commission strongly recommends them." },
      { name: "Energy Efficient Mortgages (EEM)", howItWorks: "Banks offer preferential mortgage terms for properties meeting energy performance standards, or for purchases including a renovation plan.", strengths: "Integrates renovation financing into the most familiar financial product. Evidence shows energy-efficient properties have lower payment default rates.", limitations: "Only available at point of purchase or refinancing. Requires robust energy performance certification." },
    ]},
  { level: "New and innovative", color: "bg-amber-50 border-amber-300", cardBg: "bg-amber-50/50",
    description: "Emerging instruments that address the structural limitations of traditional and tested models. Research shows these instruments received the best average OSS-suitability score across all maturity levels.",
    keyInsight: "Innovative instruments score well not because they are novel, but because they combine private financing with non-financial support for vulnerable groups, energy performance guarantees, and scalability. They address multiple barriers simultaneously rather than tackling financing in isolation.",
    instruments: [
      { name: "Guarantee funds", howItWorks: "Publicly capitalised mechanisms that absorb credit risk banks cannot or will not take. The fund promises to cover loan losses up to a defined percentage, allowing banks to lend to higher-risk borrowers.", strengths: "Directly addresses the two-thirds access problem. Bank provision drops to near zero, transforming lending economics (see Module 3). Can target vulnerable households specifically.", limitations: "Requires initial public capitalisation. Regulatory frameworks still developing. Must be credible and well-capitalised to change bank behaviour." },
      { name: "Integrated service provider models", howItWorks: 'An organisation combines technical project management, financial assembly, quality control, and social support into a single service — delivering "bank-ready" renovation projects with verified data and performance guarantees.', strengths: "Reduces bank administrative costs by delivering pre-packaged applications. Provides non-financial support that traditional instruments ignore. Evidence suggests these models score highly precisely because they address multiple barriers simultaneously.", limitations: "Requires skilled staff and sustained operational funding. Reaching self-sustainability remains a challenge for most providers." },
      { name: "Property-value-based instruments", howItWorks: "Mechanisms that mobilise the property's value itself: land separation with institutional leaseback, minority equity stakes, or mobilising unused building rights to fund renovation.", strengths: "Designed for asset-rich, cash-poor homeowners — typically elderly with valuable property but insufficient income for credit. Does not require debt capacity.", limitations: "Requires legislative enabling. Administratively complex. Emerging and largely untested at scale." },
      { name: "Property-assessed clean financing (R-PACE)", howItWorks: "Renovation cost repaid through a special assessment on the property tax bill. The obligation attaches to the property, not the owner, and transfers on sale. Repayment periods can be 15–25 years.", strengths: "Long repayment periods reduce monthly costs. Transfers with property. Does not appear on personal debt record.", limitations: "Requires enabling legislation and municipal cooperation. Limited EU adoption. Consumer protection concerns." },
    ]},
];

export const criteria = [
  { name: "Upfront capital requirement", desc: "Does the homeowner need to pay large sums before work begins?", weight: "High" },
  { name: "Eligibility breadth", desc: "How many households can access this instrument?", weight: "High" },
  { name: "Energy savings assurance", desc: "Does the instrument require a legal guarantee that savings will be achieved?", weight: "High" },
  { name: "Scalability and replicability", desc: "Can this grow to cover a large share of the need? Can it be adopted elsewhere?", weight: "Medium" },
  { name: "Support for vulnerable groups", desc: "Does it provide additional non-financial benefits for vulnerable households?", weight: "Medium" },
  { name: "Pressure on public financing", desc: "How dependent on continued public budget allocation?", weight: "Medium" },
  { name: "Transaction cost efficiency", desc: "Are administrative costs proportionate to the benefit?", weight: "Lower" },
  { name: "Private capital integration", desc: "Does it attract and integrate private-sector financing?", weight: "Lower" },
];

export const fiveSources = [
  { name: "1. The State & Public Sector", brings: "Grants, soft loans, tax incentives, regulatory requirements.", constraint: "Budget cycles. Never covers the whole cost.", note: "If a homeowner is waiting for full subsidy, they will wait forever.", border: "border-l-blue-500 border-blue-200", noteColor: "text-blue-700", titleColor: "text-blue-800" },
  { name: "2. Banks & Lenders", brings: "Commercial loans, green mortgages, refinancing.", constraint: "The one-third problem. Two-thirds excluded by credit algorithms.", note: "Deliver bank-ready applications: complete documentation, verified energy data, subsidy confirmation in hand.", border: "border-l-emerald-500 border-emerald-200", noteColor: "text-emerald-700", titleColor: "text-emerald-800" },
  { name: "3. Guarantee Mechanisms", brings: "Risk absorption. Covers loan losses, enabling banks to lend to rejected borrowers.", constraint: "Requires public capitalisation. Not available everywhere.", note: "The single most important enabler for the two-thirds who cannot get a standard loan.", border: "border-l-violet-500 border-violet-200", noteColor: "text-violet-700", titleColor: "text-violet-800" },
  { name: "4. Energy Companies & Third Parties", brings: "Energy Efficiency Obligations, on-bill repayment, performance contracting.", constraint: "Varies by country. Better established for commercial than residential.", note: "The least familiar source. If participants draw a blank, that is a finding.", border: "border-l-amber-500 border-amber-200", noteColor: "text-amber-700", titleColor: "text-amber-800" },
  { name: "5. The Homeowner", brings: "Equity, the decision, the property itself.", constraint: "", note: "Not just money. It is the decision. Everything else is contingent on one person saying yes.", border: "border-l-stone-400 border-stone-200", noteColor: "text-stone-500", titleColor: "text-stone-700" },
];

export const roleplayScenarios = [
  { name: "Scenario A: The Young Family", situation: "Ana and Tomas, early 30s, bought an older flat two years ago. Both work. Combined income €3,200/month. Small savings. They feel the cold in winter and worry about rising energy bills.", energyBill: 220, savings: 140, renovationCost: 35000, subsidies: 12000, loanTerm: 15, interestRate: 2.5,
    concerns: ["Can we really afford this on top of our mortgage?", "What if one of us loses their job?", "The numbers seem too good — what's the catch?"],
    coaching: [
      { lead: "Lead with the monthly number:", body: "\"Your energy bill is €220/month. After renovation, it would drop to about €80. The loan repayment is €{repay}/month. So your net monthly cost barely changes — but your home gets warmer, healthier, and more valuable.\"" },
      { lead: "Address the mortgage concern:", body: "This isn't additional debt in the way a second mortgage is. The energy savings are real and immediate — you're redirecting spending, not adding it." },
      { lead: "Address job-loss fear:", body: "If a guarantee fund backs the loan, the repayment terms can be adjusted in hardship. And unlike your mortgage, a well-renovated property is easier to sell if you ever need to." },
    ]},
  { name: "Scenario B: The Retired Widow", situation: "Brigitte, 72, owns her house outright. Pension of €1,100/month. No savings to speak of. The house is draughty and her energy bills are enormous. She has no interest in debt.", energyBill: 310, savings: 200, renovationCost: 45000, subsidies: 25000, loanTerm: 20, interestRate: 0,
    concerns: ["I don't want to die in debt.", "I'm too old for all this disruption.", "What happens if something goes wrong with the work?"],
    coaching: [
      { lead: "Reframe debt:", body: "You're not taking on debt — you're redirecting your energy spending. With a zero-interest loan backed by a guarantee fund, your monthly payment would be €{repay} — significantly less than your current energy bill. And if anything happens, the guarantee mechanism protects you." },
      { lead: "Address the age concern:", body: "The benefits start immediately: a warmer house this winter, lower bills next month. And the property's value is protected for your heirs." },
      { lead: "Address disruption fear:", body: "The advisory service coordinates the entire project. You don't manage the contractors — we do. And all work is quality-checked before you pay the final balance." },
    ]},
  { name: "Scenario C: The Reluctant Landlord", situation: "Karol owns two rental apartments in an older building. He's been told he may not be able to rent them legally if they fall below the energy performance threshold. He sees renovation as a cost, not an investment.", energyBill: 0, savings: 0, renovationCost: 60000, subsidies: 15000, loanTerm: 12, interestRate: 3,
    concerns: ["My tenants are paying the energy bills, not me.", "I don't want to raise rents — I'll lose my tenants.", "Why should I spend €60,000 on a building that's already earning?"],
    coaching: [
      { lead: "Lead with regulatory risk:", body: "\"If your properties fall below the minimum energy threshold, you won't be allowed to rent them. That's not a possibility — it's a deadline. The question isn't whether to renovate, but when and how.\"" },
      { lead: "Reframe the economics:", body: "After renovation, your property's value increases — and unrenovated properties in the same market are losing value. The gap is growing. Renovation protects your asset." },
      { lead: "Address the rent concern:", body: "In many markets, tenants are willing to pay modestly more for a well-insulated, comfortable flat with low energy bills. And you'll attract better tenants who stay longer." },
    ]},
];

export const conversationSteps = [
  { title: "Start with their energy bill", body: "Ask what they pay per month. This is money they are already spending — and it's the baseline against which everything else will be measured." },
  { title: "Explain the savings potential", body: "Based on the energy audit, show what their bill would be after renovation. Use conservative estimates — 75% of the theoretical saving is a prudent figure that accounts for real-world conditions." },
  { title: "Present the total cost and how it's covered", body: "Show the renovation cost, then subtract: subsidies reduce it, the loan covers the remainder. Don't itemise every instrument — show the net amount that needs financing." },
  { title: "Show the monthly number", body: "This is the moment of truth: \"You will pay €X per month for Y years, and save €Z per month on energy.\" If X ≤ Z, the renovation costs them nothing net." },
  { title: "Address their specific concern", body: "Every homeowner has one. It might be debt, disruption, risk, or scepticism. Acknowledge it directly and answer with specifics, not reassurance." },
];

export const moduleList = [
  { num: 1, title: "Why Renovation Is a Financial Question", time: "15 min", desc: "The value proposition that unlocks everything else." },
  { num: 2, title: "Who Pays and Why — The Stakeholder Map", time: "15 min", desc: "Six actors, six sets of motivations, one project." },
  { num: 3, title: "How Banks Actually Think", time: "20 min", desc: "The equation behind every lending decision." },
  { num: 4, title: "Assembling the Financing Plan", time: "20 min", desc: "Five sources of money, one assembly — with a framework you can fill in locally." },
  { num: 5, title: "Building the Conversation with the Homeowner", time: "15 min", desc: "Reducing complexity to one number that matters." },
];

export const navItems = [
  { id: "welcome", label: "Home", shortLabel: "⌂" },
  { id: "mod1", label: "1. The Financial Question", shortLabel: "1" },
  { id: "mod2", label: "2. Stakeholders", shortLabel: "2" },
  { id: "mod3", label: "3. How Banks Think", shortLabel: "3" },
  { id: "mod4", label: "4. The Financing Plan", shortLabel: "4" },
  { id: "mod5", label: "5. The Conversation", shortLabel: "5" },
];

export const serif = { fontFamily: "'Source Serif 4', serif" };
export const sans = { fontFamily: "'DM Sans', sans-serif" };
