import {Injectable} from '@angular/core';

export const StorageKey = {
  tasks: 'tasks'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  remove(key: string) {
    if (this.get(key)) {
      localStorage.removeItem(key);
    }
  }

  get(key: string, json = true) {
    return localStorage.getItem(key) ? json ? JSON.parse(localStorage.getItem(key)!) : localStorage.getItem(key) : null;
  }

  save(payload: { key: string, data: any, json?: boolean}) {
    const {data, json = true, key} = payload
    if (this.get(key, json)) {
      localStorage.removeItem(key);
    }
    json ? localStorage.setItem(key, JSON.stringify(data)) : localStorage.setItem(key, data);
  }
}
