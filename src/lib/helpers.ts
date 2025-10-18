const publicPages = [
  "/auth",
  "/auth/2fa",
  "/auth/reset-password",
  "/auth/forget-password",
];

// Define allowed routes per role
const adminRoutes = [
  "/",
  "organizations",
  "users",
  "knowledge",
  "entities",
  "platform",
];

const userRoutes = [
  "/",
  "cases",
  "alerts",
  "tasks",
  "knowledge",
  "dashboards",
  "search",
  "organizations",
];
export { publicPages, adminRoutes, userRoutes };
