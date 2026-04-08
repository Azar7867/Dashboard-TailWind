export default function Team() {
  const members = [
    { name: "John Doe", role: "Frontend Developer", status: "Active" },
    { name: "Sara Khan", role: "Backend Developer", status: "Active" },
    { name: "David Lee", role: "UI/UX Designer", status: "Inactive" },
    { name: "Priya Sharma", role: "Project Manager", status: "Active" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Team Management</h1>
      <p className="text-gray-500 mt-2">
        Manage your team members and roles.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">{m.name}</td>
                <td>{m.role}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      m.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}