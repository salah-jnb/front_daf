// API Configuration and endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = {
  baseUrl: API_BASE_URL,

  async fetch(path: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  },

  // Contacts endpoints
  contacts: {
    getAll: () => apiClient.fetch('/contacts').then(r => r.json()),
    getById: (id: number) => apiClient.fetch(`/contacts/${id}`).then(r => r.json()),
    create: (data: any) => apiClient.fetch('/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
    update: (id: number, data: any) => apiClient.fetch(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
    delete: (id: number) => apiClient.fetch(`/contacts/${id}`, { method: 'DELETE' }),
  },

  // Offices endpoints
  offices: {
    getAll: () => apiClient.fetch('/offices').then(r => r.json()),
    getById: (id: number) => apiClient.fetch(`/offices/${id}`).then(r => r.json()),
    create: (data: any) => apiClient.fetch('/offices', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
    update: (id: number, data: any) => apiClient.fetch(`/offices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
    delete: (id: number) => apiClient.fetch(`/offices/${id}`, { method: 'DELETE' }),
  },

  // Sponsors endpoints
  sponsors: {
    getAll: () => apiClient.fetch('/sponsors').then(r => r.json()),
    getById: (id: number) => apiClient.fetch(`/sponsors/${id}`).then(r => r.json()),
    delete: (id: number) => apiClient.fetch(`/sponsors/${id}`, { method: 'DELETE' }),
    upload: (infoId: number, file: File) => {
      const fd = new FormData();
      fd.append('file', file);
      return apiClient.fetch(`/informations/${infoId}/sponsors/upload`, {
        method: 'POST',
        headers: {}, // Don't set Content-Type for FormData
        body: fd,
      }).then(r => r.json());
    },
  },

  // Blocks endpoints
  blocks: {
    getAll: () => apiClient.fetch('/blocks').then(r => r.json()),
    getById: (id: number) => apiClient.fetch(`/blocks/${id}`).then(r => r.json()),
    create: (titre: string, description: string, file: File) => {
      const fd = new FormData();
      fd.append('titre', titre);
      fd.append('description', description);
      fd.append('file', file);
      return apiClient.fetch('/blocks', {
        method: 'POST',
        headers: {}, // Don't set Content-Type for FormData
        body: fd,
      }).then(r => r.json());
    },
    update: (id: number, titre?: string, description?: string, file?: File) => {
      const fd = new FormData();
      if (titre) fd.append('titre', titre);
      if (description) fd.append('description', description);
      if (file) fd.append('file', file);
      return apiClient.fetch(`/blocks/${id}`, {
        method: 'PUT',
        headers: {}, // Don't set Content-Type for FormData
        body: fd,
      }).then(r => r.json());
    },
    delete: (id: number) => apiClient.fetch(`/blocks/${id}`, { method: 'DELETE' }),
  },

  // Information endpoints
  information: {
    getById: (id: number) => apiClient.fetch(`/informations/${id}`).then(r => r.json()),
    getAll: () => apiClient.fetch('/informations').then(r => r.json()),
    create: (data: any) => apiClient.fetch('/informations', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => r.json()),
    update: (id: number, data: any) => apiClient.fetch(`/informations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(r => r.json()),
    delete: (id: number) => apiClient.fetch(`/informations/${id}`, { method: 'DELETE' }),
  },
};
