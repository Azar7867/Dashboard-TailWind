export default function Projects() {
  const projects = [
    { name: "E-commerce Website", status: "In Progress" },
    { name: "Admin Dashboard", status: "Completed" },
    { name: "Mobile App", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="text-gray-500 mt-2">
        Track and manage all your projects.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-500 mt-2">
              Status: {project.status}
            </p>

            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}