import {
  PrivacyPolicy,
  privacyPolicyMetadata,
} from "@/components/privacy-policy";

export const metadata = privacyPolicyMetadata("en");

export default function PrivacyPolicyPageEn() {
  return <PrivacyPolicy lang="en" />;
}
