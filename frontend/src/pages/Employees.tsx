import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Calculator, X, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};

const months = [
  "January 2026", "February 2026", "March 2026", "April 2026",
  "May 2026", "June 2026", "July 2026", "August 2026",
  "September 2026", "October 2026", "November 2026", "December 2026",
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [month, setMonth] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<{ gross: number; deductions: number; net: number } | null>(null);
  const { toast } = useToast();

  const token = localStorage.getItem("token");

  // 🔥 Fetch Employees from Backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setEmployees(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch employees",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Server Error",
          description: "Unable to connect to backend",
          variant: "destructive",
        });
      }
    };

    fetchEmployees();
  }, []);

  // 🔥 Call Backend Payroll API
  const handleCalculate = async () => {
    if (!month) {
      toast({
        title: "Select a month",
        description: "Please choose a payroll month.",
        variant: "destructive",
      });
      return;
    }

    setCalculating(true);
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/payroll/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employee_id: selectedEmployee?.id,
            month: month,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        setCalculating(false);
        return;
      }

      setResult({
        gross: data.payroll.grossSalary,
        deductions: data.payroll.deductions,
        net: data.payroll.netSalary,
      });

      toast({
        title: "Payroll calculated",
        description: `Net salary: ₹${data.payroll.netSalary.toLocaleString()}`,
      });

    } catch {
      toast({
        title: "Server Error",
        description: "Failed to calculate payroll",
        variant: "destructive",
      });
    }

    setCalculating(false);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setMonth("");
    setResult(null);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-lg font-semibold text-foreground">Employees</h2>
        <p className="text-sm text-muted-foreground mt-1">{employees.length} team members</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-card rounded-xl border border-border p-5 card-shadow hover:card-shadow-hover transition-all"
          >
            <div>
              <h3 className="font-semibold text-card-foreground text-sm">{emp.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{emp.department}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Base Salary</p>
                <p className="text-base font-semibold text-card-foreground">
                  ₹{Number(emp.salary).toLocaleString()}
                </p>
              </div>
              <Button
                size="sm"
                className="gradient-primary text-primary-foreground text-xs h-8"
                onClick={() => setSelectedEmployee(emp)}
              >
                <Calculator className="h-3.5 w-3.5 mr-1.5" />
                Calculate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card rounded-xl border border-border p-6 w-full max-w-md card-shadow">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="font-semibold">Calculate Payroll</h3>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.name}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleCalculate}
                    disabled={calculating}
                    className="w-full gradient-primary"
                  >
                    {calculating ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <DollarSign className="h-4 w-4 mr-2" />
                    )}
                    {calculating ? "Calculating..." : "Calculate Payroll"}
                  </Button>

                  {result && (
                    <div className="bg-muted rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Gross</span>
                        <span>₹{result.gross.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Deductions</span>
                        <span className="text-destructive">
                          -₹{result.deductions.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Net Salary</span>
                        <span className="text-success">
                          ₹{result.net.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Employees;
