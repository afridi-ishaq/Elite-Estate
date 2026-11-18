
"use client";

import { useActionState } from "react";
import { updateSettings } from "@/actions/settings-actions";
import {
  Building2,
  BrainCircuit,
  MessageCircle,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  KeyRound,
  Smartphone,
} from "lucide-react";

const input =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/10";

function Field({ label, hint, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {Icon && <Icon size={16} className="text-[#0F4C5C]" />}
        {label}
      </span>

      {children}

      {hint && (
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          {hint}
        </span>
      )}
    </label>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
          <Icon size={21} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

export default function SettingsForm({ settings, secrets }) {
  const [state, formAction, pending] = useActionState(
    updateSettings,
    null
  );

  return (
    <form action={formAction} className="space-y-8">

      {/* Main form card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-7 text-white sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Building2 size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                General Settings
              </h1>
              <p className="mt-1 text-sm text-white/75">
                Manage your company information and integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="space-y-10 p-6 sm:p-8">

          {/* Company */}
          <SettingsSection
            icon={Building2}
            title="Company Information"
            description="Manage your business identity and contact details."
          >
            <Field label="Company Name" icon={Building2}>
              <input
                name="companyName"
                defaultValue={settings.companyName || ""}
                placeholder="Elite Estates"
                className={input}
              />
            </Field>

            <Field label="Company Email" icon={Mail}>
              <input
                type="email"
                name="companyEmail"
                defaultValue={settings.companyEmail || ""}
                placeholder="info@example.com"
                className={input}
              />
            </Field>

            <Field label="Company Phone" icon={Phone}>
              <input
                name="companyPhone"
                defaultValue={settings.companyPhone || ""}
                placeholder="+92 300 1234567"
                className={input}
              />
            </Field>

            <Field label="Company Address" icon={MapPin}>
              <input
                name="companyAddress"
                defaultValue={settings.companyAddress || ""}
                placeholder="Enter company address"
                className={input}
              />
            </Field>
          </SettingsSection>

          {/* AI Integration */}
          <SettingsSection
            icon={BrainCircuit}
            title="AI Integration"
            description="Configure Gemini to power intelligent lead analysis."
          >
            <div className="sm:col-span-2">
              <Field
                label="Gemini API Key"
                icon={KeyRound}
                hint={
                  secrets.geminiHint
                    ? `Saved (ends in ${secrets.geminiHint}). Leave blank to keep the existing key.`
                    : "Not set. Falling back to the .env key if there is one."
                }
              >
                <input
                  type="password"
                  name="geminiApiKey"
                  autoComplete="off"
                  placeholder="Paste your new Gemini API key"
                  className={input}
                />
              </Field>
            </div>
          </SettingsSection>

          {/* WhatsApp Integration */}
          <SettingsSection
            icon={MessageCircle}
            title="WhatsApp Integration"
            description="Configure WhatsApp Cloud API for automated lead notifications."
          >
            <div className="sm:col-span-2">
              <Field
                label="WhatsApp Number"
                icon={Smartphone}
                hint="The number that receives HOT lead alerts, including country code. Example: 923001234567"
              >
                <input
                  name="whatsappNumber"
                  defaultValue={settings.whatsappNumber || ""}
                  placeholder="923001234567"
                  className={input}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field
                label="WhatsApp Phone ID"
                icon={Smartphone}
                hint="Your Phone Number ID from Meta WhatsApp Cloud API."
              >
                <input
                  name="whatsappPhoneId"
                  defaultValue={settings.whatsappPhoneId || ""}
                  placeholder="Enter WhatsApp Phone ID"
                  className={input}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field
                label="WhatsApp Access Token"
                icon={KeyRound}
                hint={
                  secrets.whatsappHint
                    ? `Saved (ends in ${secrets.whatsappHint}). Leave blank to keep the existing token.`
                    : "Not set. Enter your WhatsApp Cloud API access token."
                }
              >
                <input
                  type="password"
                  name="whatsappToken"
                  autoComplete="off"
                  placeholder="Paste your new WhatsApp access token"
                  className={input}
                />
              </Field>
            </div>
          </SettingsSection>

        </div>

        {/* Footer / Actions */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              {state?.message && (
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    state.success
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {state.success ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}

                  <span>{state.message}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b3844] focus:outline-none focus:ring-4 focus:ring-[#0F4C5C]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving Settings...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Settings
                </>
              )}
            </button>

          </div>
        </div>

      </div>
    </form>
  );
}
