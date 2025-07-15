import jobAlertsData from "@/services/mockData/jobAlerts.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a copy of the data to avoid mutations
let jobAlerts = [...jobAlertsData];

export const jobAlertService = {
  async getAll() {
    await delay(300);
    return [...jobAlerts];
  },

  async getById(id) {
    await delay(200);
    const alert = jobAlerts.find(a => a.Id === parseInt(id));
    if (!alert) {
      throw new Error("Job alert not found");
    }
    return { ...alert };
  },

  async create(alertData) {
    await delay(250);
    const maxId = jobAlerts.reduce((max, alert) => Math.max(max, alert.Id), 0);
    const newAlert = {
      ...alertData,
      Id: maxId + 1,
      createdDate: new Date().toISOString()
    };
    jobAlerts.push(newAlert);
    return { ...newAlert };
  },

  async update(id, alertData) {
    await delay(250);
    const index = jobAlerts.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Job alert not found");
    }
    jobAlerts[index] = { ...jobAlerts[index], ...alertData };
    return { ...jobAlerts[index] };
  },

  async delete(id) {
    await delay(200);
    const index = jobAlerts.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Job alert not found");
    }
    jobAlerts.splice(index, 1);
    return true;
  }
};