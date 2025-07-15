import jobsData from "@/services/mockData/jobs.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a copy of the data to avoid mutations
let jobs = [...jobsData];

export const jobService = {
  async getAll() {
    await delay(300);
    return [...jobs];
  },

  async getById(id) {
    await delay(200);
    const job = jobs.find(j => j.Id === parseInt(id));
    if (!job) {
      throw new Error("Job not found");
    }
    return { ...job };
  },

  async create(jobData) {
    await delay(250);
    const maxId = jobs.reduce((max, job) => Math.max(max, job.Id), 0);
    const newJob = {
      ...jobData,
      Id: maxId + 1,
      postedDate: new Date().toISOString()
    };
    jobs.push(newJob);
    return { ...newJob };
  },

  async update(id, jobData) {
    await delay(250);
    const index = jobs.findIndex(j => j.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Job not found");
    }
    jobs[index] = { ...jobs[index], ...jobData };
    return { ...jobs[index] };
  },

  async delete(id) {
    await delay(200);
    const index = jobs.findIndex(j => j.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Job not found");
    }
    jobs.splice(index, 1);
    return true;
  }
};