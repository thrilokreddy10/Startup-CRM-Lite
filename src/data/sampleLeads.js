/**
 * Sample leads data to initialize the CRM when localStorage is empty.
 * Contains 6 realistic-looking fake leads with varied statuses.
 */
export const sampleLeads = [
  {
    id: "1001",
    name: "Aarav Sharma",
    company: "TechNova India",
    email: "aarav@technova.in",
    phone: "+91 98765 43210",
    status: "New",
    source: "Website",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  },
  {
    id: "1002",
    name: "Priya Patel",
    company: "Innovate Solutions",
    email: "priya.p@innovatesolutions.com",
    phone: "+91 91234 56789",
    status: "Contacted",
    source: "LinkedIn",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString() // 4 days ago
  },
  {
    id: "1003",
    name: "Rohan Gupta",
    company: "Future Retail",
    email: "rohan.g@futureretail.in",
    phone: "+91 99887 76655",
    status: "Won",
    source: "Referral",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString() // 10 days ago
  },
  {
    id: "1004",
    name: "Sneha Reddy",
    company: "Global Logistics",
    email: "s.reddy@globallogistics.com",
    phone: "+91 98712 34560",
    status: "Lost",
    source: "Cold Call",
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString() // 15 days ago
  },
  {
    id: "1005",
    name: "Vikram Singh",
    company: "Singh Builders",
    email: "vikram@singhbuilders.co.in",
    phone: "+91 97654 32109",
    status: "Meeting Scheduled",
    source: "Website",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString() // 1 day ago
  },
  {
    id: "1006",
    name: "Ananya Desai",
    company: "Desai Tech",
    email: "ananya@desaitech.com",
    phone: "+91 90123 45678",
    status: "New",
    source: "Email Campaign",
    createdAt: new Date().toISOString() // today
  }
];
