import Layout from "@/Layouts/Layout";

export default function About() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] w-full py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Online Nepali FM</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              Welcome to Online Nepali FM, your premier destination for
              streaming radio stations from across Nepal. Our platform brings
              together a diverse collection of radio stations, making it easy
              for listeners to stay connected with Nepali music, news, and
              culture from anywhere in the world.
            </p>
            {/* Add more content as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
