export default function Help() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Help & Support</h1>
      <p className="text-gray-500 mt-2">
        Get support and documentation.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold">Documentation</h2>
          <p className="text-gray-500 text-sm mt-2">
            Learn how to use the platform with guides.
          </p>
          <button className="mt-3 text-blue-500">Read Docs →</button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold">Contact Support</h2>
          <p className="text-gray-500 text-sm mt-2">
            Need help? Reach out to our support team.
          </p>
          <button className="mt-3 text-blue-500">Contact →</button>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">FAQs</h2>
        <ul className="space-y-2 text-gray-600">
          <li>How to create a project?</li>
          <li>How to manage team members?</li>
          <li>How to reset password?</li>
        </ul>
      </div>
    </div>
  );
}