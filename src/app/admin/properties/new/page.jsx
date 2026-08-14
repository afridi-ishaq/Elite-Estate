import CreatePropertyForm from "@/components/admin/CreatePropertyForm";

export default function NewPropertyPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-md">
          <h1 className="text-4xl font-bold mb-8">
            Add Property
          </h1>

          <CreatePropertyForm />
        </div>
      </div>
    </main>
  );
}