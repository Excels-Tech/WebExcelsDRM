import OpenAI from "openai";

// This is using Replit's AI Integrations service - blueprint:javascript_openai_ai_integrations
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export type UserRole = "Sales Executive" | "Assistant Manager" | "Manager" | "HOD" | "Admin";

export interface AssistantContext {
  currentScreen: string;
  userRole: UserRole;
  screenData?: Record<string, any>;
  userName?: string;
}

function buildSystemPrompt(context: AssistantContext): string {
  return `You are WebX-AI Assistant, an intelligent AI assistant built exclusively for the WebExcels DRM (Data Relation Management) platform.

# CRITICAL BOUNDARIES:
- You ONLY assist with queries related to WebExcels DRM features, data, and workflows
- You MUST REJECT any questions about the outer world, general knowledge, or topics outside this system
- If asked about anything outside WebExcels DRM, politely respond: "I'm WebX-AI Assistant, designed exclusively for WebExcels DRM. I can only help with questions about this platform's features, your data, and workflows. How can I assist you within WebExcels DRM?"

# CURRENT CONTEXT:
- User Role: ${context.userRole}
- Current Screen/Module: ${context.currentScreen}
- User Name: ${context.userName || "User"}

# SCREEN DATA (if available):
${context.screenData ? JSON.stringify(context.screenData, null, 2) : "No specific screen data provided"}

# YOUR CAPABILITIES:
Based on the user's role and current screen, you can:
1. Explain features and functionality of the current module
2. Analyze visible data and provide insights
3. Suggest next steps based on the workflow context
4. Answer questions about metrics, targets, and performance data
5. Help interpret customer information, lead grades, and project stages
6. Explain commission structures and sales targets
7. Provide guidance on using different pools (Private, Service, BV, Public)
8. Assist with activity tracking and reporting workflows
9. Help with task management and to-do prioritization
10. Guide through PMS, training modules, and reporting features

# ROLE-SPECIFIC PERMISSIONS:
${getRoleCapabilities(context.userRole)}

# RESPONSE GUIDELINES:
- Be concise and actionable
- Reference specific data from the screen when relevant
- Provide role-appropriate insights
- Suggest next steps aligned with WebExcels workflows
- Use professional but friendly tone
- Format numbers and dates clearly
- Highlight important deadlines or urgent items

Remember: You are part of WebExcels DRM. Never provide information or assistance outside this platform's scope.`;
}

function getRoleCapabilities(role: UserRole): string {
  const capabilities: Record<UserRole, string> = {
    "Sales Executive": `As a Sales Executive, you have access to:
- Dashboard with personal metrics and targets
- Customer management and follow-up tracking
- Activity logging and reporting
- Lead pools (Private, Service, Public)
- Sales target tracking for Alibaba & VAS
- To-do list management
- Training resources`,
    
    "Assistant Manager": `As an Assistant Manager, you have access to:
- All Sales Executive features
- Team performance overview
- Lead assignment and distribution
- Task assignment to team members
- Performance monitoring of sales executives`,
    
    "Manager": `As a Manager, you have access to:
- All Assistant Manager features
- Department-wide analytics
- Advanced reporting tools
- Approval workflows (overtime, loans)
- Team productivity metrics`,
    
    "HOD": `As Head of Department, you have access to:
- All Manager features
- Cross-department analytics
- Strategic planning tools
- Resource allocation oversight
- High-level performance dashboards`,
    
    "Admin": `As Admin, you have full system access:
- All user management features
- System configuration
- Public pool management
- Global analytics and reports
- All approval workflows
- Data management tools`,
  };
  
  return capabilities[role] || capabilities["Sales Executive"];
}

export async function generateAssistantResponse(
  context: AssistantContext,
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<string> {
  try {
    const systemPrompt = buildSystemPrompt(context);
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages,
      max_completion_tokens: 8192,
    });

    return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    throw new Error("Failed to generate assistant response");
  }
}

// Context detection helpers for different screens
export function getScreenContext(screenPath: string): string {
  const screenMap: Record<string, string> = {
    "/": "Dashboard - Main overview with metrics, targets, and activity summary",
    "/attendance": "Attendance & Leave Tracker - View and manage attendance records",
    "/loan-request": "Loan Request - Submit and track loan applications",
    "/customers/duplicate-check": "Duplicate Check - Verify customer uniqueness before adding",
    "/customers/add": "Add Customer - Create new customer records",
    "/customers/temp": "Temporary Contacts - Manage temporary or unverified contacts",
    "/customers/private-pool": "Private Pool - Your personal lead collection",
    "/customers/service-pool": "Service Pool - Shared service leads",
    "/customers/gm-pool": "GM Pool - General Manager assigned leads",
    "/pms/tasks": "PMS Task Creation - Create and assign project tasks",
    "/pms/status": "PMS Project Status - Monitor project progress",
    "/workspace": "Workspace - Personal workspace and task management",
    "/reports/loan": "Loan Reports - Financial loan analytics",
    "/reports/vas": "VAS Reports - Value-Added Services performance",
    "/reports/gm": "GM Reports - General Manager metrics",
    "/reports/bv": "BV Reports - Business Verification analytics",
    "/training/drm": "DRM Training - Learn the Data Relation Management system",
    "/training/seo": "SEO Training - Search Engine Optimization courses",
    "/training/alibaba": "Alibaba Training - Alibaba platform training",
  };
  
  return screenMap[screenPath] || "Unknown Screen";
}
