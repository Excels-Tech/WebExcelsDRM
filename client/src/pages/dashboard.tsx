import { MetricCard } from "@/components/metric-card";
import { SalesTargetTracker } from "@/components/sales-target-tracker";
import { PerformanceGraph } from "@/components/performance-graph";
import { ActivityLogger } from "@/components/activity-logger";
import { CustomerList } from "@/components/customer-list";
import { TodoList } from "@/components/todo-list";
import { QuickActions } from "@/components/quick-actions";
import { VasGraph } from "@/components/vas-graph";
import { PublicPool } from "@/components/public-pool";
import { Users, UserPlus, RefreshCw, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Customers"
            value="1,248"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricCard
            title="Contacts Added"
            value="156"
            icon={UserPlus}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricCard
            title="New Customers"
            value="42"
            icon={RefreshCw}
            trend={{ value: 3.1, isPositive: false }}
          />
          <MetricCard
            title="Renewals"
            value="28"
            icon={Clock}
            subtitle="14 expiring in 7 days"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SalesTargetTracker />
            <PerformanceGraph />
            <CustomerList />
          </div>

          <div className="space-y-6">
            <ActivityLogger />
            <TodoList />
            <VasGraph />
            <QuickActions />
            <PublicPool />
          </div>
        </div>
      </div>
    </div>
  );
}
