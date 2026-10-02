"use client";

import { useActionState } from "react";
import { updateSettings } from "@/actions/settings-actions";

const input = "w-full border border-gray-300 rounded-xl p-3";

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1">{label}</span>
      {children}
      {hint && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
    </label>
  );
}

export default function SettingsForm({ settings, secrets }) {
  const [state, formAction, pending] = useActionState(updateSettings, null);

  return (
    <form action={formAction} className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0F4C5C]">Company</h2>
        <Field label="Company Name">
          <input name="companyName" defaultValue={settings.companyName || ""} className={input} />
        </Field>
        <Field label="Company Email">
          <input type="email" name="companyEmail" defaultValue={settings.companyEmail || ""} className={input} />
        </Field>
        <Field label="Company Phone">
          <input name="companyPhone" defaultValue={settings.companyPhone || ""} className={input} />
        </Field>
        <Field label="Company Address">
          <input name="companyAddress" defaultValue={settings.companyAddress || ""} className={input} />
        </Field>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0F4C5C]">AI (Gemini)</h2>
        <Field
          label="Gemini API Key"
          hint={
            secrets.geminiHint
              ? `Saved (ends in ${secrets.geminiHint}). Leave blank to keep it.`
              : "Not set. Falling back to the .env key if there is one."
          }
        >
          <input type="password" name="geminiApiKey" autoComplete="off" placeholder="Paste new key" className={input} />
        </Field>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0F4C5C]">WhatsApp</h2>
        <Field label="WhatsApp Number" hint="The number that receives HOT lead alerts, with country code, e.g. 923001234567">
          <input name="whatsappNumber" defaultValue={settings.whatsappNumber || ""} className={input} />
        </Field>
        <Field label="WhatsApp Phone ID" hint="From Meta WhatsApp Cloud API">
          <input name="whatsappPhoneId" defaultValue={settings.whatsappPhoneId || ""} className={input} />
        </Field>
        <Field
          label="WhatsApp Token"
          hint={
            secrets.whatsappHint
              ? `Saved (ends in ${secrets.whatsappHint}). Leave blank to keep it.`
              : "Not set."
          }
        >
          <input type="password" name="whatsappToken" autoComplete="off" placeholder="Paste new token" className={input} />
        </Field>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-[#0F4C5C] px-6 py-3 rounded-xl font-semibold disabled:opacity-60"
          style={{ color: "white" }}
        >
          {pending ? "Saving..." : "Save Settings"}
        </button>

        {state && (
          <span className={state.success ? "text-green-600" : "text-red-600"}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}