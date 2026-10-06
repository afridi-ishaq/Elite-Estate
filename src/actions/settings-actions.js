"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { saveSettings } from "@/lib/settings-service";
import { sendTestMessage } from "@/lib/whatsapp-service";

const clean = (v) => {
  const s = String(v ?? "").trim();
  return s === "" ? null : s;
};

export async function updateSettings(prevState, formData) {
  try {
    await requireAdmin();

    const data = {
      companyName: clean(formData.get("companyName")),
      companyEmail: clean(formData.get("companyEmail")),
      companyPhone: clean(formData.get("companyPhone")),
      companyAddress: clean(formData.get("companyAddress")),
      whatsappNumber: clean(formData.get("whatsappNumber")),
      whatsappPhoneId: clean(formData.get("whatsappPhoneId")),
    };

    const geminiApiKey = clean(formData.get("geminiApiKey"));
    const whatsappToken = clean(formData.get("whatsappToken"));
    if (geminiApiKey) data.geminiApiKey = geminiApiKey;
    if (whatsappToken) data.whatsappToken = whatsappToken;

    await saveSettings(data);
    revalidatePath("/admin/settings");

    return { success: true, message: "Settings saved." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Could not save settings." };
  }
}

export async function testWhatsApp() {
  try {
    await requireAdmin();
    await sendTestMessage();
    return { success: true, message: "Test message sent. Check your WhatsApp." };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}