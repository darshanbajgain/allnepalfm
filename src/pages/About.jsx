import Layout from "@/layouts/Layout";
import { Radio, Music, Headphones, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] w-full py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            About Online Nepali FM
          </h1>

          <div className="space-y-8">
            <section className="prose prose-lg dark:prose-invert">
              <p className=" text-foreground">
                Welcome to Online Nepali FM, your gateway to publicly available
                Nepali radio stations. We provide a simple, user-friendly
                platform for listeners to tune into their favorite Nepali
                broadcasts from anywhere in the world.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Radio,
                    title: "Live Streaming",
                    description:
                      "Access to live streams of public Nepali radio stations."
                  },
                  {
                    icon: Music,
                    title: "Diverse Content",
                    description:
                      "A variety of content including music, news, and cultural programs."
                  },
                  {
                    icon: Headphones,
                    title: "Easy Listening",
                    description:
                      "Simple interface for a seamless listening experience."
                  },
                  {
                    icon: Globe,
                    title: "Global Access",
                    description:
                      "Listen to Nepali stations from anywhere in the world."
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-card dark:bg-card/50 p-4 rounded-md shadow-sm"
                  >
                    <item.icon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className=" bg-card dark:bg-card/50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 ">Our Mission</h2>
              <p className="mb-4">
                At Online Nepali FM, we aim to connect Nepali communities
                worldwide with their favorite radio stations. Our platform is
                designed to be a bridge between listeners and publicly available
                Nepali broadcasts, helping you stay in touch with news, music,
                and culture from Nepal, no matter where you are.
              </p>
              <p className="mb-4">
                We're committed to providing a free, accessible service that
                respects copyright and broadcasting rights. Our platform only
                streams publicly available content, ensuring that we support the
                Nepali broadcasting community while serving our listeners.
              </p>
              <button
                onClick={handleClick}
                className="bg-primary/60 text-white px-6 py-2 border-2 border-opacity-5 border-blue-50 rounded-md hover:bg-primary/50 transition-colors"
              >
                Start Listening Now
              </button>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
