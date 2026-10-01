/* KageLandingPage, copied verbatim from ThreeUI's registered LandingPages.tsx
   (revision c8e06b90397a). That file is not vendored here because it imports
   11 other catalog pages that are not part of the Kage source bundle. */
import { splitTypographyProps, usePageTypography, type PageTypographyProps } from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
import { KAGE_TYPOGRAPHY } from "./pageRecipes";

export function KageLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Kage — Where stillness reveals the unseen" sourceUrl="/landing-pages/kage.html" />;
}
