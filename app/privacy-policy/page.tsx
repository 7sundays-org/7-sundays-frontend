import {
  PrivacyPolicy,
  privacyPolicyMetadata,
} from "@/components/privacy-policy";

export const metadata = privacyPolicyMetadata("it");

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy lang="it" />;
}
