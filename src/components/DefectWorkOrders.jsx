import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_DEFECTS } from '../data/mockDefects';
import { Wrench, CheckCircle, Clock, AlertTriangle, FileText, Download, Filter, PlusCircle } from 'lucide-react';

export const DefectWorkOrders = ({ defects = MOCK_DEFECTS, setDefects }) => {
  const { isEasyMode } = useLanguage();
  const [defectList, setDefectList] = useState(defects);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  const handleDispatchWorkOrder = (id) => {
    setDefectList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Work Order Issued', statusSimple: 'Repair Team Sent' } : d))
    );
  };

  const handleMarkResolved = (id) => {
    setDefectList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Fixed & Verified', statusSimple: 'Repair Completed!' } : d))
    );
  };

  const filtered = defectList.filter((d) => {
    if (filterSeverity === 'all') return true;
    return d.severity.toLowerCase() === filterSeverity;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">
              {isEasyMode ? "Road Repair List & Work Orders" : "Infrastructure Deficiencies & Repair Work Order Management"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-xs font-mono">
              MAINTENANCE QUEUE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isEasyMode
              ? "Automatically created when bus cameras detect potholes, broken signboards, or erased pedestrian zebra crossings."
              : "Automated work order creation derived from multi-bus edge detection frequency and defect severity scoring."}
          </p>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterSeverity === 'all' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isEasyMode ? "All Defects" : "All Priorities"}
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterSeverity === 'critical' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🚨 {isEasyMode ? "Urgent / Danger" : "Critical"}
            </button>
            <button
              onClick={() => setFilterSeverity('high')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterSeverity === 'high' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚠️ {isEasyMode ? "High Priority" : "High Severity"}
            </button>
          </div>

          <button
            onClick={() => alert(isEasyMode ? "Exporting Road Repair List..." : "Exporting Maintenance Report JSON...")}
            className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isEasyMode ? "Export List" : "Export PDF/JSON"}</span>
          </button>
        </div>
      </div>

      {/* Work Orders List Table / Cards */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isResolved = item.status.includes('Fixed');
          const isIssued = item.status.includes('Issued') || item.status.includes('Sent');

          return (
            <div
              key={item.id}
              className={`bg-slate-950 border rounded-2xl p-4 transition hover:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.severity === 'Critical' ? 'border-rose-900/60' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start space-x-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt="Defect proof"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-800 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-amber-400 font-bold text-xl shrink-0">
                    🕳️
                  </div>
                )}

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{item.id}</span>
                    <h3 className="font-bold text-sm text-white">
                      {isEasyMode ? item.typeSimple : item.type}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.severity === 'Critical'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1">
                    {isEasyMode ? item.descriptionSimple : item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono">
                    <span>📍 {item.street}</span>
                    <span>🚌 Detected by {item.detectedBy}</span>
                    <span>⏱️ {item.timestamp}</span>
                    <span className="text-amber-400">Score: {item.confidence}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 shrink-0 md:self-center">
                {isResolved ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isEasyMode ? "Fixed & Done" : "Resolved"}</span>
                  </span>
                ) : isIssued ? (
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-xl bg-amber-950 text-amber-300 border border-amber-800 text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>{isEasyMode ? "Team Working" : "In Progress"}</span>
                    </span>
                    <button
                      onClick={() => handleMarkResolved(item.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
                    >
                      {isEasyMode ? "Mark Fixed" : "Verify Resolution"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDispatchWorkOrder(item.id)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center space-x-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{isEasyMode ? "Send Repair Team" : "Issue Repair Work Order"}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
