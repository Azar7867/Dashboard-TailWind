import { Book, LifeBuoy, ChevronRight, HelpCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Help & Support</h1>
        <p className="text-slate-500 mt-2">
          Find answers, read documentation, or get in touch with our expert team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-blue-100 transition-colors">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Book size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Knowledge Base</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Comprehensive guides and documentation to help you master every feature of our platform.
          </p>
          <button className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Start Learning <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:border-blue-100 transition-colors">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <LifeBuoy size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Direct Support</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Having technical difficulties? Our support specialists are available 24/7 to assist you.
          </p>
          <button className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Contact Us <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <HelpCircle className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {[
              "How do I initialize a new project workspace?",
              "Can I export team data in CSV format?",
              "How to manage role-based access control?",
              "What happens when I reset my security codes?",
              "Is there an API available for automation?"
            ].map((faq, i) => (
              <li key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{faq}</span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}