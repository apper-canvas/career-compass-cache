import resumesData from "@/services/mockData/resumes.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a copy of the data to avoid mutations
let resumes = [...resumesData];

export const resumeService = {
  async getAll() {
    await delay(300);
    return [...resumes];
  },

  async getById(id) {
    await delay(200);
    const resume = resumes.find(r => r.Id === parseInt(id));
    if (!resume) {
      throw new Error("Resume not found");
    }
    return { ...resume };
  },

  async create(resumeData) {
    await delay(250);
    const maxId = resumes.reduce((max, resume) => Math.max(max, resume.Id), 0);
    const newResume = {
      ...resumeData,
      Id: maxId + 1,
      uploadDate: new Date().toISOString()
    };
    resumes.push(newResume);
    return { ...newResume };
  },

  async update(id, resumeData) {
    await delay(250);
    const index = resumes.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Resume not found");
    }
    resumes[index] = { ...resumes[index], ...resumeData };
    return { ...resumes[index] };
  },

  async delete(id) {
    await delay(200);
    const index = resumes.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Resume not found");
    }
    resumes.splice(index, 1);
    return true;
  }
};