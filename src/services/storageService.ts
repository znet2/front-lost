import { Item, ReturnRequest, Notification, ReturnHistory, ReturnProcess } from '../types';

const STORAGE_KEYS = {
  ITEMS: 'lf_items',
  REQUESTS: 'lf_requests',
  NOTIFICATIONS: 'lf_notifications',
  HISTORY: 'lf_history',
  RETURNS: 'lf_returns',
  USER_ROLE: 'lf_user_role'
};

// Items
export const getItems = (): Item[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ITEMS);
  return data ? JSON.parse(data) : [];
};

export const saveItems = (items: Item[]): void => {
  localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
};

export const addItem = (item: Item): void => {
  const items = getItems();
  items.push(item);
  saveItems(items);
};

export const updateItem = (id: string, updates: Partial<Item>): void => {
  const items = getItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    saveItems(items);
  }
};

export const deleteItem = (id: string): void => {
  const items = getItems();
  saveItems(items.filter(item => item.id !== id));
};

export const getItemById = (id: string): Item | undefined => {
  const items = getItems();
  return items.find(item => item.id === id);
};

// Requests
export const getRequests = (): ReturnRequest[] => {
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  return data ? JSON.parse(data) : [];
};

export const saveRequests = (requests: ReturnRequest[]): void => {
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
};

export const addRequest = (request: ReturnRequest): void => {
  const requests = getRequests();
  requests.push(request);
  saveRequests(requests);
};

export const updateRequest = (id: string, updates: Partial<ReturnRequest>): void => {
  const requests = getRequests();
  const index = requests.findIndex(req => req.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates, updatedAt: new Date().toISOString() };
    saveRequests(requests);
  }
};

export const getRequestById = (id: string): ReturnRequest | undefined => {
  const requests = getRequests();
  return requests.find(req => req.id === id);
};

// Notifications
export const getNotifications = (): Notification[] => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : [];
};

export const saveNotifications = (notifications: Notification[]): void => {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const addNotification = (notification: Notification): void => {
  const notifications = getNotifications();
  notifications.unshift(notification);
  saveNotifications(notifications);
};

export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    saveNotifications(notifications);
  }
};

export const markAllNotificationsAsRead = (userId: string): void => {
  const notifications = getNotifications();
  notifications.forEach(n => {
    if (n.userId === userId) {
      n.read = true;
    }
  });
  saveNotifications(notifications);
};

// Return History
export const getReturnHistory = (): ReturnHistory[] => {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
};

export const saveReturnHistory = (history: ReturnHistory[]): void => {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const addReturnHistory = (record: ReturnHistory): void => {
  const history = getReturnHistory();
  history.push(record);
  saveReturnHistory(history);
};

// Return Process
export const getReturnProcesses = (): ReturnProcess[] => {
  const data = localStorage.getItem(STORAGE_KEYS.RETURNS);
  return data ? JSON.parse(data) : [];
};

export const saveReturnProcesses = (processes: ReturnProcess[]): void => {
  localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(processes));
};

export const addReturnProcess = (process: ReturnProcess): void => {
  const processes = getReturnProcesses();
  processes.push(process);
  saveReturnProcesses(processes);
};

export const updateReturnProcess = (id: string, updates: Partial<ReturnProcess>): void => {
  const processes = getReturnProcesses();
  const index = processes.findIndex(p => p.id === id);
  if (index !== -1) {
    processes[index] = { ...processes[index], ...updates, updatedAt: new Date().toISOString() };
    saveReturnProcesses(processes);
  }
};

export const getReturnProcessById = (id: string): ReturnProcess | undefined => {
  const processes = getReturnProcesses();
  return processes.find(p => p.id === id);
};

// Initialize storage with mock data if empty
export const initializeStorage = (
  items: Item[],
  requests: ReturnRequest[],
  notifications: Notification[]
): void => {
  if (getItems().length === 0) {
    saveItems(items);
  }
  if (getRequests().length === 0) {
    saveRequests(requests);
  }
  if (getNotifications().length === 0) {
    saveNotifications(notifications);
  }
};

// Clear all data (for demo purposes)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ITEMS);
  localStorage.removeItem(STORAGE_KEYS.REQUESTS);
  localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
  localStorage.removeItem(STORAGE_KEYS.RETURNS);
};
