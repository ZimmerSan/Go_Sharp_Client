export const SiteTemplateCategory = {
    BLOG: 'Blog',
    LANDING: 'Landing',
    OFFICIAL: 'Official',
    MARKET: 'Market',
};

export const SITE_TEMPLATE_CATEGORIES = [
    SiteTemplateCategory.BLOG,
    SiteTemplateCategory.LANDING,
    SiteTemplateCategory.OFFICIAL,
    SiteTemplateCategory.MARKET,
];

export const Status = {
    Initial: "Initial",
    InProgress: "InProgress",
    Completed: "Completed",
    Cancelled: "Cancelled",
};

export const STATUS = [
    Status.Initial,
    Status.InProgress,
    Status.Completed,
    Status.Cancelled
];

export const Role = {
    Admin: "Admin",
    Developer: "Developer",
    Manager: "Manager",
    Customer: "Customer",
};

export const ROLES = [
    Role.Admin, Role.Developer, Role.Manager, Role.Customer
];

export const StatusLabelStyle = {
    [Status.Initial]: 'label-warning',
    [Status.InProgress]: 'label-success',
    [Status.Completed]: 'label-primary',
    [Status.Cancelled]: 'label-danger',
};