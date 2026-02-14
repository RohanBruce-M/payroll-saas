export interface Employee {
  id: string;
  name: string;
  department: string;
  baseSalary: number;
  avatar: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  calculatedAt: string;
}

export const employees: Employee[] = [
  { id: "1", name: "Sarah Chen", department: "Engineering", baseSalary: 9500, avatar: "SC" },
  { id: "2", name: "Marcus Rivera", department: "Design", baseSalary: 8200, avatar: "MR" },
  { id: "3", name: "Aisha Patel", department: "Marketing", baseSalary: 7800, avatar: "AP" },
  { id: "4", name: "James O'Brien", department: "Sales", baseSalary: 8500, avatar: "JO" },
  { id: "5", name: "Yuki Tanaka", department: "Engineering", baseSalary: 10200, avatar: "YT" },
  { id: "6", name: "Elena Volkov", department: "HR", baseSalary: 7200, avatar: "EV" },
];

export const payrollHistory: PayrollRecord[] = [
  { id: "p1", employeeId: "1", employeeName: "Sarah Chen", month: "January 2026", grossSalary: 9500, deductions: 2375, netSalary: 7125, calculatedAt: "2026-01-31" },
  { id: "p2", employeeId: "2", employeeName: "Marcus Rivera", month: "January 2026", grossSalary: 8200, deductions: 2050, netSalary: 6150, calculatedAt: "2026-01-31" },
  { id: "p3", employeeId: "5", employeeName: "Yuki Tanaka", month: "January 2026", grossSalary: 10200, deductions: 2550, netSalary: 7650, calculatedAt: "2026-01-31" },
  { id: "p4", employeeId: "1", employeeName: "Sarah Chen", month: "December 2025", grossSalary: 9500, deductions: 2375, netSalary: 7125, calculatedAt: "2025-12-31" },
  { id: "p5", employeeId: "3", employeeName: "Aisha Patel", month: "January 2026", grossSalary: 7800, deductions: 1950, netSalary: 5850, calculatedAt: "2026-01-31" },
  { id: "p6", employeeId: "4", employeeName: "James O'Brien", month: "January 2026", grossSalary: 8500, deductions: 2125, netSalary: 6375, calculatedAt: "2026-01-31" },
];
