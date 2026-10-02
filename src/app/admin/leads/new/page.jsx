import Container from "@/components/Container";
import AddLeadForm from "@/components/AddLeadForm";

export default function NewLeadPage() {
  return (
    <main className="pt-32 pb-24">
      <Container>
        <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-6">Add Lead</h1>
          <AddLeadForm />
        </div>
      </Container>
    </main>
  );
}