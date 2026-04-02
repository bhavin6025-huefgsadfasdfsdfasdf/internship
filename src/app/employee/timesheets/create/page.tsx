'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Plus, Trash2, Clock } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface TaskRow {
  id: string;
  taskName: string;
  project: string;
  hours: number[]; // 7 days
}

export default function TimesheetCreatePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [rows, setRows] = useState<TaskRow[]>([
    { id: '1', taskName: 'Frontend Development', project: 'SaaS Platform', hours: [8, 8, 8, 4, 0, 0, 0] },
    { id: '2', taskName: 'Bug Fixing', project: 'Internal Tools', hours: [0, 0, 0, 4, 8, 0, 0] },
    { id: '3', taskName: 'Meetings', project: 'General', hours: [1, 1, 1, 1, 1, 0, 0] },
  ]);

  // Calculate totals
  const dailyTotals = DAYS.map((_, dayIndex) => 
    rows.reduce((sum, row) => sum + (row.hours[dayIndex] || 0), 0)
  );
  
  const weeklyTotal = dailyTotals.reduce((sum, dayTotal) => sum + dayTotal, 0);
  const weeklyGoal = 40;
  const remainingHours = Math.max(0, weeklyGoal - weeklyTotal);

  const handleHourChange = (rowIndex: number, dayIndex: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newRows = [...rows];
    newRows[rowIndex].hours[dayIndex] = numValue;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { 
      id: Math.random().toString(36).substr(2, 9), 
      taskName: '', 
      project: '', 
      hours: [0, 0, 0, 0, 0, 0, 0] 
    }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    return DAYS.map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    });
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              const d = new Date(currentWeek);
              d.setDate(d.getDate() - 7);
              setCurrentWeek(d);
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-lg font-semibold text-gray-800">
            Week of {weekDates[0]} - {weekDates[6]}
          </div>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => {
              const d = new Date(currentWeek);
              d.setDate(d.getDate() + 7);
              setCurrentWeek(d);
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            Clear
          </button>
          <button className="btn-primary" onClick={() => console.log('Saving timesheet...', rows)}>
            <Save size={18} />
            Save Timesheet
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-bottom border-gray-200">
                  <th className="p-4 font-medium text-gray-500 w-1/4">Task / Project</th>
                  {DAYS.map((day, i) => (
                    <th key={day} className="p-4 font-medium text-gray-500 text-center">
                      <div>{day}</div>
                      <div className="text-xs font-normal opacity-70">{weekDates[i]}</div>
                    </th>
                  ))}
                  <th className="p-4 font-medium text-gray-500 text-center w-16">Total</th>
                  <th className="p-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <input 
                        type="text" 
                        placeholder="Task Name"
                        className="w-full bg-transparent border-none focus:ring-0 font-medium text-gray-800 placeholder-gray-400"
                        value={row.taskName}
                        onChange={(e) => {
                          const newRows = [...rows];
                          newRows[rowIndex].taskName = e.target.value;
                          setRows(newRows);
                        }}
                      />
                      <input 
                        type="text" 
                        placeholder="Project"
                        className="w-full bg-transparent border-none focus:ring-0 text-xs text-gray-500 placeholder-gray-300"
                        value={row.project}
                        onChange={(e) => {
                          const newRows = [...rows];
                          newRows[rowIndex].project = e.target.value;
                          setRows(newRows);
                        }}
                      />
                    </td>
                    {row.hours.map((hour, dayIndex) => (
                      <td key={dayIndex} className="p-2">
                        <input 
                          type="number" 
                          min="0" 
                          max="24"
                          step="0.5"
                          className="w-full text-center p-2 rounded-md border-transparent hover:border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                          value={hour === 0 ? '' : hour}
                          onChange={(e) => handleHourChange(rowIndex, dayIndex, e.target.value)}
                        />
                      </td>
                    ))}
                    <td className="p-4 text-center font-semibold text-gray-700">
                      {row.hours.reduce((a, b) => a + b, 0)}
                    </td>
                    <td className="p-4">
                      <button 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeRow(row.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="p-4">
                    <button 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      onClick={addRow}
                    >
                      <Plus size={16} />
                      Add Task
                    </button>
                  </td>
                  {dailyTotals.map((total, i) => (
                    <td key={i} className="p-4 text-center font-bold text-gray-800">
                      {total}
                    </td>
                  ))}
                  <td className="p-4 text-center font-bold text-blue-600">
                    {weeklyTotal}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="w-80 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-blue-500" />
              Weekly Summary
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Total Progress</span>
                  <span>{weeklyTotal}h / {weeklyGoal}h</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${weeklyTotal >= weeklyGoal ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(100, (weeklyTotal / weeklyGoal) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Loggged</div>
                  <div className="text-2xl font-bold text-gray-800">{weeklyTotal}h</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Remaining</div>
                  <div className="text-2xl font-bold text-gray-800">{remainingHours}h</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
                  <p className="font-medium mb-1">Pro Tip:</p>
                  Keep your descriptions concise for better review clarity.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-lg shadow-md text-white">
            <h4 className="font-semibold mb-2">Submit Guidelines</h4>
            <ul className="text-sm space-y-2 opacity-90">
              <li>• Only log working hours</li>
              <li>• Submit by Friday EOD</li>
              <li>• Manager approval needed</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
