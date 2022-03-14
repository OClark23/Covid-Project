export const getAllPatients = payload => api.get(`/patients`, payload);
export const getPatientById = id => api.get(`/patient/${id}`);
export const insertPatient = payload => api.post(`/patient`, payload);
export const updatePatientById = (id, payload) => api.put(`/patient/${id}`, payload);
export const deletePatientById = id => api.delete(`/patient/${id}`);

const apis = {
  getAllPatients,
  getPatientById,
  insertPatient,
  updatePatientById,
  deletePatientById
};

export default apis;