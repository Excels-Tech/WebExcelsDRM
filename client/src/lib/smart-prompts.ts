// Smart prompts that adapt to each screen in WebExcels DRM

export interface SmartPrompt {
  label: string;
  prompt: string;
  icon?: string;
}

export function getSmartPromptsForScreen(screenPath: string): SmartPrompt[] {
  const promptMap: Record<string, SmartPrompt[]> = {
    "/": [
      { label: "Daily Summary", prompt: "Summarize today's performance across all my metrics" },
      { label: "What's Urgent?", prompt: "What needs my immediate attention right now?" },
      { label: "Goal Progress", prompt: "How close am I to my sales targets this month?" },
      { label: "Top Priorities", prompt: "What should I focus on today to maximize results?" },
    ],
    "/attendance": [
      { label: "My Attendance", prompt: "Show my attendance summary for this month" },
      { label: "Leave Balance", prompt: "How many leave days do I have remaining?" },
      { label: "Recent Activity", prompt: "What were my attendance patterns last week?" },
    ],
    "/loan-request": [
      { label: "Pending Loans", prompt: "How many loan requests are pending approval?" },
      { label: "My Requests", prompt: "Show status of my loan applications" },
      { label: "Approval Timeline", prompt: "What's the typical approval time for loans?" },
    ],
    "/customers/duplicate-check": [
      { label: "How It Works", prompt: "Explain the duplicate check process" },
      { label: "Common Issues", prompt: "What are common reasons for duplicate matches?" },
    ],
    "/customers/add": [
      { label: "Required Fields", prompt: "What information is required to add a customer?" },
      { label: "Best Practices", prompt: "What are best practices for customer data entry?" },
      { label: "Lead Grading", prompt: "Explain how to assign lead grades" },
    ],
    "/customers/temp": [
      { label: "Review Contacts", prompt: "Which temporary contacts should I convert to customers?" },
      { label: "Cleanup Guide", prompt: "How should I manage temporary contacts?" },
    ],
    "/customers/private-pool": [
      { label: "My Pool Size", prompt: "How many leads are in my private pool?" },
      { label: "Hot Leads", prompt: "Which leads in my pool need immediate follow-up?" },
      { label: "Conversion Rate", prompt: "What's my conversion rate from private pool?" },
    ],
    "/customers/service-pool": [
      { label: "Available Leads", prompt: "Show leads available in the service pool" },
      { label: "Claim Strategy", prompt: "Which service pool leads should I claim?" },
    ],
    "/customers/gm-pool": [
      { label: "GM Assigned", prompt: "Show leads assigned to me from GM pool" },
      { label: "Performance", prompt: "How am I performing on GM pool leads?" },
    ],
    "/pms/tasks": [
      { label: "Overdue Tasks", prompt: "Which tasks are overdue?" },
      { label: "Create Task", prompt: "Guide me through creating a new task" },
      { label: "My Workload", prompt: "Summarize my current task workload" },
    ],
    "/pms/status": [
      { label: "Project Summary", prompt: "Summarize progress on active projects" },
      { label: "Bottlenecks", prompt: "Identify any project bottlenecks or delays" },
      { label: "Timeline", prompt: "Which projects are at risk of missing deadlines?" },
    ],
    "/workspace": [
      { label: "Today's Plan", prompt: "What should I accomplish in my workspace today?" },
      { label: "Organize Tasks", prompt: "Help me prioritize my workspace tasks" },
    ],
    "/reports/loan": [
      { label: "Analyze Trends", prompt: "Analyze loan report trends" },
      { label: "Key Insights", prompt: "What are the key insights from loan data?" },
    ],
    "/reports/vas": [
      { label: "VAS Performance", prompt: "Summarize VAS performance this period" },
      { label: "Top Performers", prompt: "Show top performing VAS categories" },
      { label: "Improvement Areas", prompt: "Where can I improve VAS sales?" },
    ],
    "/reports/gm": [
      { label: "GM Metrics", prompt: "Explain the GM report metrics" },
      { label: "Trends", prompt: "What trends do you see in GM data?" },
    ],
    "/reports/bv": [
      { label: "Verification Status", prompt: "Show pending business verifications" },
      { label: "Success Rate", prompt: "What's our BV completion rate?" },
    ],
    "/training/drm": [
      { label: "My Progress", prompt: "Show my progress in DRM training" },
      { label: "Next Module", prompt: "What should I learn next in DRM?" },
      { label: "Incomplete", prompt: "List my incomplete DRM training modules" },
    ],
    "/training/seo": [
      { label: "My Progress", prompt: "Show my progress in SEO training" },
      { label: "Key Concepts", prompt: "Summarize key SEO concepts I should know" },
    ],
    "/training/alibaba": [
      { label: "My Progress", prompt: "Show my progress in Alibaba training" },
      { label: "Pending Modules", prompt: "Which Alibaba training modules are pending?" },
    ],
  };

  return promptMap[screenPath] || [
    { label: "Help", prompt: "What can you help me with on this screen?" },
    { label: "Features", prompt: "Explain the features available here" },
  ];
}

// Common prompts available on all screens
export const universalPrompts: SmartPrompt[] = [
  { label: "Today's Summary", prompt: "Summarize my activity and performance for today" },
  { label: "Yesterday's Recap", prompt: "What did I miss yesterday?" },
  { label: "Follow-ups Needed", prompt: "Which leads or customers need follow-up?" },
  { label: "Quick Wins", prompt: "What quick wins can I achieve today?" },
];
