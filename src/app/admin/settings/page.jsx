import Container from "@/components/Container";
import SettingsForm from "@/components/SettingsForm";
import WhatsAppTestButton from "@/components/WhatsAppTestButton";
import { getSettings } from "@/lib/settings-service";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const s = (await getSettings()) || {};

  const settings = {
    companyName: s.companyName,
    companyEmail: s.companyEmail,
    companyPhone: s.companyPhone,
    companyAddress: s.companyAddress,
    whatsappNumber: s.whatsappNumber,
    whatsappPhoneId: s.whatsappPhoneId,
  };

  const secrets = {
    geminiHint: s.geminiApiKey ? s.geminiApiKey.slice(-4) : null,
    whatsappHint: s.whatsappToken ? s.whatsappToken.slice(-4) : null,
  };

  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-md">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>
          <SettingsForm settings={settings} secrets={secrets} />
          <WhatsAppTestButton />
        </div>
      </Container>
    </main>
  );
}