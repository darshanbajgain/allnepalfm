import Layout from "@/layouts/Layout";

const SettingsPage = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] w-full py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div className="prose prose-lg dark:prose-invert"></div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
