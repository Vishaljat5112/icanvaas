/**
 * Master Petition Categories Database (Up to 100 Categories)
 * Module 2: iCanvassPDM Profile & Team Manager Override
 *
 * Provides 100 comprehensive ballot measure categories across 10 major civic sectors.
 */

const SECTORS = [
  'Statewide Initiatives',
  'County Bonds & Infrastructure',
  'Municipal Charters & Elections',
  'Public Health & Healthcare Access',
  'Environmental & Conservation',
  'Public Safety & Justice Reform',
  'Transportation & Transit',
  'Public Education & Schools',
  'Housing Affordability & Zoning',
  'Tax Policy & Business Regulation',
];

// Helper to generate 100 realistic categories
const generate100Categories = () => {
  const categories = [
    // 1-10: Statewide Initiatives
    {
      id: 'CAT-1',
      name: 'Prop 12 - Clean Energy Ballot Initiative',
      code: 'PROP-12-2026',
      sector: 'Statewide Initiatives',
      description: 'Constitutional amendment requiring 100% renewable electricity grid standards statewide by 2035.',
      projectCount: 2,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-101',
          title: 'Prop 12 - Clean Energy Ballot Initiative',
          code: 'PROP-12-2026',
          payRate: 3.50,
          tierNote: 'Base $3.50 / valid sig • +$0.50 tier bonus above 500 sigs',
          status: 'Assigned & Active',
          badgeVariant: 'primary',
          targetSigs: 25000,
          collectedSigs: 14500,
          jurisdiction: 'State of California (All 58 Counties)',
          allowedCounties: ['Los Angeles', 'Alameda', 'Contra Costa', 'Orange', 'San Diego', 'San Francisco', 'Santa Clara'],
          eligibilityRules: [
            'Signer must be a registered California voter residing within the county of signing.',
            'Signature and printed name must be in blue or black ink.',
            'No P.O. Box allowed for voter residence address.',
            'Circulator must personally witness each signature being affixed.',
          ],
          talkingPoints: [
            'Supports 100% clean, renewable energy and grid reliability for California families by 2035.',
            'Funded by clean-air investments without raising general state income taxes.',
            'Qualifies a citizen-sponsored measure for the November general election ballot.',
          ],
        },
        {
          id: 'PRJ-104',
          title: 'Clean Drinking Water & Watershed Protection Act',
          code: 'WATER-ACT-2026',
          payRate: 3.75,
          tierNote: 'Base $3.75 / valid sig • High priority statewide initiative',
          status: 'Assigned & Active',
          badgeVariant: 'success',
          targetSigs: 30000,
          collectedSigs: 18200,
          jurisdiction: 'State of California (All 58 Counties)',
          allowedCounties: ['All 58 California Counties'],
          eligibilityRules: [
            'Registered California voters only.',
            'Circulator affidavit must be notarized upon batch completion.',
            'Voter must complete physical date of signing.',
          ],
          talkingPoints: [
            'Dedicates $5B bond to replace lead pipes and preserve mountain river watersheds.',
            'Guarantees clean water access for underserved agricultural communities.',
          ],
        },
      ],
    },
    {
      id: 'CAT-2',
      name: 'Prop 15 - Fair Property Tax Assessment Act',
      code: 'PROP-15-2026',
      sector: 'Statewide Initiatives',
      description: 'Reforms commercial property reassessment to fund local public schools and community services.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-106',
          title: 'Commercial Property Tax Split Roll Reform',
          code: 'SPLIT-ROLL-26',
          payRate: 3.25,
          tierNote: 'Base $3.25 / valid sig • Statewide campaign',
          status: 'Assigned & Active',
          badgeVariant: 'primary',
          targetSigs: 20000,
          collectedSigs: 11200,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['Registered California voters only.', 'Must witness signature.'],
          talkingPoints: ['Closes corporate property tax loopholes to fund neighborhood parks and schools.'],
        },
      ],
    },
    {
      id: 'CAT-3',
      name: 'Prop 22 - Independent Worker Protections Initiative',
      code: 'PROP-22-REV',
      sector: 'Statewide Initiatives',
      description: 'Establishes revised independent contractor healthcare stipends and mileage rates for app-based drivers.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-107',
          title: 'App-Based Driver Benefits & Safety Standard Act',
          code: 'DRIVER-BEN-26',
          payRate: 3.00,
          tierNote: 'Base $3.00 / valid sig',
          status: 'Assigned & Active',
          badgeVariant: 'primary',
          targetSigs: 18000,
          collectedSigs: 9400,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['California registered voters only.'],
          talkingPoints: ['Guarantees earnings minimums and occupational injury coverage for gig economy workers.'],
        },
      ],
    },
    {
      id: 'CAT-4',
      name: 'Prop 30 - Zero-Emission Vehicle Infrastructure Act',
      code: 'PROP-30-ZEV',
      sector: 'Statewide Initiatives',
      description: 'Funds statewide electric vehicle charging grid expansion and wildfire prevention programs.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-108',
          title: 'Clean Transportation & Wildfire Defense Initiative',
          code: 'ZEV-WILD-26',
          payRate: 3.60,
          tierNote: 'Base $3.60 / valid sig • High priority',
          status: 'Assigned & Active',
          badgeVariant: 'success',
          targetSigs: 22000,
          collectedSigs: 14800,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['Registered voters in California.'],
          talkingPoints: ['Triples rapid EV charging stations in underserved communities and hires seasonal wildfire fighters.'],
        },
      ],
    },
    {
      id: 'CAT-5',
      name: 'Prop 34 - Prescription Drug Payout Accountability Measure',
      code: 'PROP-34-RX',
      sector: 'Statewide Initiatives',
      description: 'Requires federal prescription drug revenue to be spent directly on patient healthcare services.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-109',
          title: 'Prescription Drug Revenue Safeguard Initiative',
          code: 'RX-SAFE-26',
          payRate: 3.40,
          tierNote: 'Base $3.40 / valid sig',
          status: 'Available to Request',
          badgeVariant: 'neutral',
          targetSigs: 15000,
          collectedSigs: 6200,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['California voters residing in registered county.'],
          talkingPoints: ['Ensures healthcare discount funds directly subsidize prescription medication costs for low-income patients.'],
        },
      ],
    },
    {
      id: 'CAT-6',
      name: 'Prop 47 - Public Safety Reform & Theft Penalty Act',
      code: 'PROP-47-REF',
      sector: 'Statewide Initiatives',
      description: 'Increases penalties for repeated commercial retail theft and enhances court-ordered drug treatment programs.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-110',
          title: 'Retail Theft Prevention & Treatment Mandate',
          code: 'THEFT-PREV-26',
          payRate: 4.25,
          tierNote: 'Base $4.25 / valid sig • Premium blitz initiative',
          status: 'Assigned & Active',
          badgeVariant: 'warning',
          targetSigs: 35000,
          collectedSigs: 28900,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['Registered California voters.'],
          talkingPoints: ['Restores felony penalties for serial retail shoplifters while funding vocational rehabilitation.'],
        },
      ],
    },
    {
      id: 'CAT-7',
      name: 'Prop 50 - Voter Verification & Ballot Security Measure',
      code: 'PROP-50-SEC',
      sector: 'Statewide Initiatives',
      description: 'Standardizes county election audit processes and signature verification optical scanning guidelines.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-111',
          title: 'Election Transparency & Ballot Security Act',
          code: 'ELEC-SEC-26',
          payRate: 3.10,
          tierNote: 'Base $3.10 / valid sig',
          status: 'Available to Request',
          badgeVariant: 'neutral',
          targetSigs: 14000,
          collectedSigs: 5100,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['California registered voters.'],
          talkingPoints: ['Modernizes secure ballot tracking and transparent public audits for all 58 county registrar offices.'],
        },
      ],
    },
    {
      id: 'CAT-8',
      name: 'Prop 64 - Cannabis Tax Allocation & Youth Health Act',
      code: 'PROP-64-TAX',
      sector: 'Statewide Initiatives',
      description: 'Reallocates state cannabis excise tax revenues toward local community recreation centers and youth sports.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-112',
          title: 'Youth Parks & Community Center Funding Act',
          code: 'YOUTH-FUND-26',
          payRate: 2.90,
          tierNote: 'Base $2.90 / valid sig',
          status: 'Available to Request',
          badgeVariant: 'neutral',
          targetSigs: 12000,
          collectedSigs: 4100,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['California voters only.'],
          talkingPoints: ['Funds after-school programs and sports leagues using existing cannabis tax revenues.'],
        },
      ],
    },
    {
      id: 'CAT-9',
      name: 'Prop 88 - Constitutional Right to Clean Air & Water',
      code: 'PROP-88-ENV',
      sector: 'Statewide Initiatives',
      description: 'Declares an unalienable state constitutional right to clean air, pure water, and a healthy environment.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-113',
          title: 'California Environmental Rights Amendment',
          code: 'ENV-RIGHT-26',
          payRate: 3.80,
          tierNote: 'Base $3.80 / valid sig • Statewide priority',
          status: 'Assigned & Active',
          badgeVariant: 'success',
          targetSigs: 28000,
          collectedSigs: 16700,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['Registered California voters.'],
          talkingPoints: ['Constitutional protections against corporate dumping and industrial emissions near residential neighborhoods.'],
        },
      ],
    },
    {
      id: 'CAT-10',
      name: 'Prop 99 - Term Limits & Citizens Ethics Commission',
      code: 'PROP-99-ETH',
      sector: 'Statewide Initiatives',
      description: 'Strengthens legislative conflict of interest laws and bans former lawmakers from lobbying for 5 years.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-114',
          title: 'Government Integrity & Lobbying Reform Act',
          code: 'INTEG-ACT-26',
          payRate: 3.35,
          tierNote: 'Base $3.35 / valid sig',
          status: 'Assigned & Active',
          badgeVariant: 'primary',
          targetSigs: 16000,
          collectedSigs: 8900,
          jurisdiction: 'Statewide California',
          allowedCounties: ['All 58 Counties'],
          eligibilityRules: ['Registered voters in California.'],
          talkingPoints: ['Bans golden parachute lobbying deals and requires transparent public reporting of special interest meetings.'],
        },
      ],
    },

    // 11-20: County Bonds & Infrastructure
    {
      id: 'CAT-11',
      name: 'County Measure C - Public School Modernization Bond',
      code: 'MEASURE-C-BOND',
      sector: 'County Bonds & Infrastructure',
      description: 'General obligation bond to upgrade classrooms, STEM computer labs, and seismic retrofitting.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-103',
          title: 'Education Bond Measure C — Public School Upgrades',
          code: 'MEASURE-C-BOND',
          payRate: 4.00,
          tierNote: 'Base $4.00 / valid sig • Premium school bond rate',
          status: 'Assigned & Active',
          badgeVariant: 'success',
          targetSigs: 10000,
          collectedSigs: 8900,
          jurisdiction: 'Alameda & Contra Costa Counties',
          allowedCounties: ['Alameda County', 'Contra Costa County'],
          eligibilityRules: [
            'Voter MUST be registered within Alameda or Contra Costa County.',
            'Cross-county signers are strictly invalid and will be clawed back.',
            'Affidavit on back of each sheet must be completed by circulator.',
          ],
          talkingPoints: [
            'Funds modern science, robotics, and digital computer labs for public schools.',
            'Repairs aging heating and seismic infrastructure across 45 local school campuses.',
          ],
        },
      ],
    },
    {
      id: 'CAT-12',
      name: 'County Measure W - Stormwater Cleanup & Flood Defense',
      code: 'MEASURE-W-STORM',
      sector: 'County Bonds & Infrastructure',
      description: 'Captures and cleans urban stormwater runoff before it enters bays and coastal waters.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-115',
          title: 'Clean Water & Ocean Protection Parcel Tax',
          code: 'STORM-PROT-26',
          payRate: 3.50,
          tierNote: 'Base $3.50 / valid sig',
          status: 'Assigned & Active',
          badgeVariant: 'primary',
          targetSigs: 12000,
          collectedSigs: 7300,
          jurisdiction: 'Los Angeles County',
          allowedCounties: ['Los Angeles County'],
          eligibilityRules: ['Registered voters in Los Angeles County only.'],
          talkingPoints: ['Prevents toxic road runoff from polluting beaches and builds permeable park infrastructure.'],
        },
      ],
    },
    {
      id: 'CAT-13',
      name: 'County Measure A - Trauma Hospital & Emergency Care Bond',
      code: 'MEASURE-A-HOSP',
      sector: 'County Bonds & Infrastructure',
      description: 'Expands emergency pediatric wings and upgrades regional burn care centers.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-116',
          title: 'Regional Healthcare Facilities Bond Measure',
          code: 'HOSP-FAC-26',
          payRate: 4.10,
          tierNote: 'Base $4.10 / valid sig • High demand',
          status: 'Assigned & Active',
          badgeVariant: 'success',
          targetSigs: 15000,
          collectedSigs: 11400,
          jurisdiction: 'Santa Clara County',
          allowedCounties: ['Santa Clara County'],
          eligibilityRules: ['Santa Clara County registered voters only.'],
          talkingPoints: ['Constructs new 24/7 pediatric intensive care unit and seismic replacement tower.'],
        },
      ],
    },
    {
      id: 'CAT-14',
      name: 'County Measure M - Light Rail Extension & Highway Relief',
      code: 'MEASURE-M-RAIL',
      sector: 'County Bonds & Infrastructure',
      description: 'Dedicates sales tax revenue to rapid bus lanes, commuter rail lines, and pothole repairs.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-117',
          title: 'Traffic Relief & Public Transit Expansion Bond',
          code: 'TRANS-REL-26',
          payRate: 3.85,
          tierNote: 'Base $3.85 / valid sig',
          status: 'Assigned & Active',
          badgeVariant: 'primary',
          targetSigs: 18000,
          collectedSigs: 12100,
          jurisdiction: 'San Diego County',
          allowedCounties: ['San Diego County'],
          eligibilityRules: ['San Diego County registered voters only.'],
          talkingPoints: ['Cuts freeway congestion by adding zero-emission express trolleys to downtown and university centers.'],
        },
      ],
    },
    {
      id: 'CAT-15',
      name: 'County Measure H - Homeless Housing & Mental Health Services',
      code: 'MEASURE-H-HOUS',
      sector: 'County Bonds & Infrastructure',
      description: 'Funds permanent supportive housing and mobile mental health crisis dispatch teams.',
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: 'PRJ-118',
          title: 'Supportive Housing & Crisis Team Initiative',
          code: 'CRISIS-TEAM-26',
          payRate: 3.65,
          tierNote: 'Base $3.65 / valid sig',
          status: 'Assigned & Active',
          badgeVariant: 'warning',
          targetSigs: 20000,
          collectedSigs: 13900,
          jurisdiction: 'Orange County',
          allowedCounties: ['Orange County'],
          eligibilityRules: ['Orange County registered voters only.'],
          talkingPoints: ['Clears encampments by providing monitored mental health recovery beds and job placement services.'],
        },
      ],
    },
  ];

  // Systematically generate remaining categories up to 100 to ensure full 100-category coverage
  const remainingCount = 100 - categories.length;
  for (let i = 1; i <= remainingCount; i++) {
    const catNumber = categories.length + 1;
    const sector = SECTORS[(catNumber - 1) % SECTORS.length];
    const baseCode = `MEAS-${catNumber.toString().padStart(3, '0')}`;
    const payRates = [2.75, 3.00, 3.25, 3.50, 3.75, 4.00, 4.25, 4.50];
    const chosenRate = payRates[catNumber % payRates.length];

    const sampleNames = {
      'Statewide Initiatives': [
        `Consumer Data Privacy & Digital Rights Act (${catNumber})`,
        `Agricultural Water Conservation Standards (${catNumber})`,
        `State Fair Housing Standards Initiative (${catNumber})`,
      ],
      'County Bonds & Infrastructure': [
        `Bridge & Highway Seismic Retrofit Measure (${catNumber})`,
        `Regional Airport Modernization Bond (${catNumber})`,
        `County Library & Community Hub Upgrades (${catNumber})`,
      ],
      'Municipal Charters & Elections': [
        `City Council Term Limits & Open Primary Measure (${catNumber})`,
        `Downtown Historic District Preservation Charter (${catNumber})`,
        `Neighborhood Policing Advisory Council Measure (${catNumber})`,
      ],
      'Public Health & Healthcare Access': [
        `Community Mental Health Center Expansion (${catNumber})`,
        `Senior Medical Assistance & Emergency Ambulance Measure (${catNumber})`,
        `Rural Community Health Clinic Grant (${catNumber})`,
      ],
      'Environmental & Conservation': [
        `Wildfire Mitigation & Defensible Space Act (${catNumber})`,
        `Coastal Zone Wetland & Marine Sanctuary Measure (${catNumber})`,
        `Urban Canopy & Native Tree Preservation Bond (${catNumber})`,
      ],
      'Public Safety & Justice Reform': [
        `First Responder Equipment & Paramedic Training Act (${catNumber})`,
        `Victims Restitution & Restorative Justice Initiative (${catNumber})`,
        `Wildfire Emergency Warning Siren System (${catNumber})`,
      ],
      'Transportation & Transit': [
        `Zero-Emission School Bus Fleet Conversion (${catNumber})`,
        `Bicycle Boulevard & Pedestrian Crosswalk Safety (${catNumber})`,
        `High-Speed Intercity Express Corridor Bond (${catNumber})`,
      ],
      'Public Education & Schools': [
        `Universal Pre-K & Childcare Development Bond (${catNumber})`,
        `Career Technical Vocational Training Measure (${catNumber})`,
        `Community College Tuition Assistance Endowment (${catNumber})`,
      ],
      'Housing Affordability & Zoning': [
        `Affordable Workforce Housing Trust Fund (${catNumber})`,
        `First-Time Homebuyer Downpayment Assistance Act (${catNumber})`,
        `Transit-Oriented Zoning & Infill Development Measure (${catNumber})`,
      ],
      'Tax Policy & Business Regulation': [
        `Small Business Tax Exemption & Growth Measure (${catNumber})`,
        `Commercial Vacancy Assessment & Revitalization Act (${catNumber})`,
        `Local Tourism & Hotel Surcharge Allocation (${catNumber})`,
      ],
    };

    const sectorOptions = sampleNames[sector] || [`Civic Initiative ${catNumber}`];
    const categoryName = sectorOptions[(catNumber) % sectorOptions.length];

    categories.push({
      id: `CAT-${catNumber}`,
      name: categoryName,
      code: baseCode,
      sector: sector,
      description: `Official certified ballot measure petition covering ${sector.toLowerCase()} within California designated voting precincts.`,
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: `PRJ-${catNumber + 200}`,
          title: categoryName,
          code: baseCode,
          payRate: chosenRate,
          tierNote: `Base $${chosenRate.toFixed(2)} / valid sig • Standard county drive`,
          status: catNumber % 3 === 0 ? 'Assigned & Active' : (catNumber % 3 === 1 ? 'Available to Request' : 'High Priority'),
          badgeVariant: catNumber % 3 === 0 ? 'primary' : (catNumber % 3 === 1 ? 'neutral' : 'warning'),
          targetSigs: 10000 + (catNumber * 250),
          collectedSigs: Math.floor((10000 + (catNumber * 250)) * 0.45),
          jurisdiction: catNumber % 2 === 0 ? 'California Statewide' : 'Regional Multi-County District',
          allowedCounties: ['Los Angeles', 'Alameda', 'San Diego', 'Orange', 'Contra Costa'],
          eligibilityRules: [
            'Signers must be registered voters in the applicable jurisdiction.',
            'Signatures must be personally witnessed by the circulator.',
            'No post office boxes for residential voter addresses.',
          ],
          talkingPoints: [
            `Directly advances ${sector.toLowerCase()} across local California communities.`,
            'Qualifies a citizen-led initiative on the next statewide or municipal general election ballot.',
          ],
        },
      ],
    });
  }

  return categories;
};

// Cached 100 categories list
export const MASTER_PETITION_CATEGORIES = generate100Categories();

// Flattened projects list for fast lookups
export const ALL_PROJECTS = MASTER_PETITION_CATEGORIES.flatMap((c) =>
  c.activeProjects.map((p) => ({
    ...p,
    categoryId: c.id,
    categoryName: c.name,
    categoryCode: c.code,
    sector: c.sector,
  }))
);

/**
 * Local storage key for Team Manager My Turn In override
 */
export const TURN_IN_OVERRIDE_STORAGE_KEY = 'icanvass_turnin_override';

/**
 * Returns active override or default assignment
 */
export const getActiveTurnInOverride = () => {
  try {
    const saved = localStorage.getItem(TURN_IN_OVERRIDE_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading turn in override:', e);
  }

  return {
    circulatorId: 'circulator',
    circulatorName: 'Tanya Sterling',
    badgeId: 'CIR-88204',
    assignedManager: 'Leo Fontaine',
    assignedManagerTitle: 'Circulator Logistics Manager',
    currentCategoryId: 'CAT-1',
    currentCategoryName: 'Prop 12 - Clean Energy Ballot Initiative',
    currentProjectCode: 'PROP-12-2026',
    currentPayRate: 3.50,
    overrideActive: false,
    reason: 'Standard Base Campaign Assignment',
    effectiveDate: '2026-10-10',
    notes: 'Default assignment for Zone CA-4 Downtown Metro Corridor.',
    status: 'Standard',
  };
};

/**
 * Sets new turn in category override
 */
export const setActiveTurnInOverride = (overrideData) => {
  try {
    const dataWithTimestamp = {
      ...overrideData,
      overrideActive: true,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(TURN_IN_OVERRIDE_STORAGE_KEY, JSON.stringify(dataWithTimestamp));
    return dataWithTimestamp;
  } catch (e) {
    console.error('Error saving turn in override:', e);
    return null;
  }
};
