import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Employee = {
  id: number;
  name: string;
};

type PayrollRecord = {
  id: number;
  employee_id: number;
  month: string;
  gross_salary: number;
  deductions: number;
  net_salary: number;
};

const PayrollHistory = () => {
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  // 🔥 Fetch Employees (for name mapping)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
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
    const fetchAllPayroll = async () => {
      try {
        const allRecords: PayrollRecord[] = [];

        for (const emp of employees) {
          const response = await fetch(
            `http://localhost:5000/api/payroll/${emp.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.ok) {
            const data = await response.json();

            data.payroll_history.forEach((item: any, index: number) => {
              allRecords.push({
                id: index + Math.random(),
                employee_id: emp.id,
                month: item.month,
                gross_salary: item.gross_salary,
                deductions: item.deductions,
                net_salary: item.net_salary,
              });
            });
          }
        }

        setRecords(allRecords);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch payroll history",
          variant: "destructive",
        });
      }
    };

    if (employees.length > 0) {
      fetchAllPayroll();
    }
  }, [employees]);

  // Group by month
  const grouped = records.reduce<Record<string, PayrollRecord[]>>(
    (acc, r) => {
      (acc[r.month] = acc[r.month] || []).push(r);
      return acc;
    },
    {}
  );

  const getEmployeeName = (id: number) =>
    employees.find((e) => e.id === id)?.name || "Unknown";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-foreground">
          Payroll History
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          All processed payroll records
        </p>
      </motion.div>

      <div className="mt-6 space-y-6">
        {Object.entries(grouped).map(([month, monthRecords]) => (
          <motion.div
            key={month}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                {month}
              </h3>
              <span className="text-xs text-muted-foreground">
                ({monthRecords.length} records)
              </span>
            </div>

            <div className="space-y-2">
              {monthRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-card rounded-xl border border-border p-4 card-shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {getEmployeeName(record.employee_id)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Gross: ₹{record.gross_salary.toLocaleString()} ·
                        Deductions: ₹{record.deductions.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-semibold text-success">
                      ₹{record.net_salary.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Net</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PayrollHistory;
