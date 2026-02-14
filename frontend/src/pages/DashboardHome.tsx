import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Employee = {
  id: number;
  name: string;
  salary: number;
};

type PayrollRecord = {
  employee_id: number;
  month: string;
  net_salary: number;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const DashboardHome = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  // 🔥 Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setEmployees(data);
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch employees",
          variant: "destructive",
        });
      }
    };

    fetchEmployees();
  }, []);

  // 🔥 Fetch Payroll For Each Employee
  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const allRecords: PayrollRecord[] = [];

        for (const emp of employees) {
          const res = await fetch(
            `http://localhost:5000/api/payroll/${emp.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (res.ok) {
            const data = await res.json();
            data.payroll_history.forEach((p: any) => {
              allRecords.push({
                employee_id: emp.id,
                month: p.month,
                net_salary: p.net_salary,
              });
            });
          }
        }

        setPayrollRecords(allRecords);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch payroll records",
          variant: "destructive",
        });
      }
    };

    if (employees.length > 0) {
      fetchPayroll();
    }
  }, [employees]);

  const totalEmployees = employees.length;
  const totalPayroll = employees.reduce((sum, e) => sum + Number(e.salary), 0);
  const avgSalary = totalEmployees > 0 ? totalPayroll / totalEmployees : 0;
  const totalPayrollRuns = payrollRecords.length;

  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees.toString(),
      icon: Users,
      change: "Active members",
    },
    {
      label: "Total Payroll",
      value: `₹${totalPayroll.toLocaleString()}`,
      icon: DollarSign,
      change: "Monthly cost",
    },
    {
      label: "Avg. Salary",
      value: `₹${Math.round(avgSalary).toLocaleString()}`,
      icon: TrendingUp,
      change: "Per employee",
    },
    {
      label: "Payrolls Run",
      value: totalPayrollRuns.toString(),
      icon: Calendar,
      change: "All months",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-foreground">Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Your payroll at a glance
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="bg-card rounded-xl border border-border p-5 card-shadow hover:card-shadow-hover transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-card-foreground mt-2">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Payroll Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Recent Payroll Records
        </h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">
                    Employee ID
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">
                    Month
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase">
                    Net Salary
                  </th>
                </tr>
              </thead>
              <tbody>
                {payrollRecords.slice(0, 5).map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-card-foreground">
                      {record.employee_id}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {record.month}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-success">
                      ₹{record.net_salary.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;

