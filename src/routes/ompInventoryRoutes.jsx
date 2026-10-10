import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DealerVerificationFlow } from '../pages/omp/verification/DealerVerificationFlow';
import { VerifiedDealerDashboard } from '../pages/omp/verification/VerifiedDealerDashboard';
import { FeedSync } from '../pages/omp/inventory/FeedSync';
import { TopLeadIndicator } from '../pages/omp/leads/TopLeadIndicator';
import { OmpMarketplace } from '../pages/omp/marketplace/OmpMarketplace';
import { VehicleListingDetail } from '../pages/omp/marketplace/VehicleListingDetail';
import { VinScanner } from '../pages/omp/inventory/VinScanner';
import { MarketPricing } from '../pages/omp/inventory/MarketPricing';
import { TitleSearch } from '../pages/omp/inventory/TitleSearch';
import { ReconCenter } from '../pages/omp/inventory/ReconCenter';
import { PhotoGenius } from '../pages/omp/media/PhotoGenius';
import { AiPostmaster } from '../pages/omp/marketing/AiPostmaster';
import { WebBuilder } from '../pages/omp/marketing/WebBuilder';

/**
 * Developer 2 Dedicated Sub-Routes: OMP Deals Inventory & Verified Dealers Suite
 * Fully isolated to prevent merge conflicts with Developer 1 and Developer 3
 */
export const OmpInventoryRoutes = () => {
  return (
    <Routes>
      {/* Task V-01: Onboarding & 4-Step Verification Wizard */}
      <Route path="verify" element={<DealerVerificationFlow />} />

      {/* Task V-02: Verified Dealer Hub & Benefits Dashboard */}
      <Route path="verified-dealer" element={<VerifiedDealerDashboard />} />

      {/* Task V-03 / N-01: DMS Auto Feed Sync */}
      <Route path="feed-sync" element={<FeedSync />} />

      {/* Task N-01 (AI): Top Lead Indicator */}
      <Route path="top-leads" element={<TopLeadIndicator />} />

      {/* Task O-01 to O-05: OfferUp Marketplace & Vehicle Detail */}
      <Route path="marketplace" element={<OmpMarketplace />} />
      <Route path="marketplace/:id" element={<VehicleListingDetail />} />

      {/* Pillar 1 (Stock the Lot): E-02 to E-05 */}
      <Route path="vin-scanner" element={<VinScanner />} />
      <Route path="market-pricing" element={<MarketPricing />} />
      <Route path="title-search" element={<TitleSearch />} />
      <Route path="recon-center" element={<ReconCenter />} />

      {/* Pillar 2 (Attract Buyers): E-06 to E-10 */}
      <Route path="photo-genius" element={<PhotoGenius />} />
      <Route path="postmaster" element={<AiPostmaster />} />
      <Route path="web-builder" element={<WebBuilder />} />

      {/* Default fallback within OMP Inventory scope */}
      <Route path="*" element={<Navigate to="verified-dealer" replace />} />
    </Routes>
  );
};

export default OmpInventoryRoutes;
