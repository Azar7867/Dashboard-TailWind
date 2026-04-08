export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-500 mt-2">
        Update your preferences and account settings.
      </p>

      <div className="mt-6 bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}