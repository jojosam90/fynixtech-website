import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseCenter from "@/components/CaseCenter";
import Solutions from "@/components/Solutions";
import Footer from "@/components/Footer";
import FloatingSidebar from "@/components/FloatingSidebar";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CaseCenter />
        <Solutions />
      </main>
      <Footer />
      <FloatingSidebar />
      <ChatWidget />
    </>
  );
}
