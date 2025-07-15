import applicationsData from "@/services/mockData/applications.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a copy of the data to avoid mutations
let applications = [...applicationsData];

export const applicationService = {
  async getAll() {
    await delay(300);
    return [...applications];
  },

  async getById(id) {
    await delay(200);
    const application = applications.find(a => a.Id === parseInt(id));
    if (!application) {
      throw new Error("Application not found");
    }
    return { ...application };
  },

  async create(applicationData) {
    await delay(250);
    const maxId = applications.reduce((max, app) => Math.max(max, app.Id), 0);
    const newApplication = {
      ...applicationData,
      Id: maxId + 1,
      appliedDate: new Date().toISOString()
    };
    applications.push(newApplication);
    return { ...newApplication };
  },

  async update(id, applicationData) {
    await delay(250);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications[index] = { ...applications[index], ...applicationData };
    return { ...applications[index] };
  },

  async delete(id) {
    await delay(200);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications.splice(index, 1);
    return true;
  }
};